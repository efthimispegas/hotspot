import validator from 'validator';

import { File, User } from '../models';
import {
  checkFileName,
  checkFilePath,
  processFile,
  objectLength,
  querySetup,
  createId
} from '../helpers';

export const fileUpload = async (req, res) => {
  let user_id = null;

  if (objectLength(req.files) !== 2) {
    return res.status(400).json({
      error: true,
      message: 'No files found for upload'
    });
  }
  if (
    !req.files.hasOwnProperty('thumb') ||
    !req.files.hasOwnProperty('object')
  ) {
    return res.status(400).json({
      error: true,
      message: 'Incorrent files for upload'
    });
  }
  if (
    typeof req.body.user_id != 'undefined' &&
    validator.isAlphanumeric(req.body.user_id)
  ) {
    user_id = req.body.user_id;
  }

  processFile(req.files.thumb)
    .then(path => {
      const thumb_file_path = path;
      processFile(req.files.object)
        .then(obj_file_path => {
          const filename = checkFileName(req.body.filename);
          const galleryFile = new File({
            filename,
            thumb_file_path,
            obj_file_path,
            uploaded_at: new Date(),
            user_id
          });
          galleryFile.save(function(err) {
            if (err) {
              return res.status(400).json({
                error: true,
                message: 'Error while saving file',
                details: err
              });
            }
            return res.status(200).send();
          });
        })
        .catch(error => {
          return res.status(400).json({
            error: true,
            message: 'Error while processing object file',
            details: error
          });
        });
    })
    .catch(error => {
      return res.status(400).json({
        error: true,
        message: 'Error while processing thumb file',
        details: error
      });
    });
};

export const getGalleryFiles = async (req, res) => {
  try {
    const q = querySetup(req);
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Invalid parameters in the request',
      details: e
    });
  }

  try {
    const query = { user_id: null };
    const options = {
      limit: q.limit,
      offset: q.offset
    };
    const result = await File.paginate(query, options);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'Error with file pagination'
      });
    }

    return res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: 'Error while fetching gallery files',
      details: error
    });
  }
};

export const getUserGallery = async (req, res) => {
  const userId = validator.escape(req.body.params);

  try {
    const q = querySetup(req);
    const query = { user_id: userId };
    const options = {
      limit: q.limit,
      offset: q.offset
    };

    const foundFile = await File.paginate(query, options);

    if (!foundFile) {
      return res.status(400).json({
        success: false,
        message: `Requested gallery from user - ${userId} not found`
      });
    }
    return res.status(200).json({
      success: true,
      message: `Succesfully fetched gallery from user - ${userId}`,
      gallery: foundFile
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: `Error while fetching the gallery form user with id - ${userId}`
    });
  }
};

export const userFileUpload = async (req, res) => {
  if (isEmptyObject(req.body)) {
    return res.status(400).json({
      success: false,
      message: 'Nothing to post'
    });
  }

  const filename = Number.isFinite(req.body.filename)
    ? req.body.filename
    : validator.escape(req.body.filename);

  const user_id = createId(req.body.user_id);

  if (!user_id) {
    return res.status(400).json({
      error: true,
      message: `Error with creating id for user - ${user_id}`,
      details: e
    });
  }

  try {
    checkFilePath(req.body.obj_file_path);
    checkFilePath(req.body.thumb_file_path);

    const { obj_file_path, thumb_file_path } = req.body;

    const foundFile = await File.findOne({
      thumb_file_path,
      obj_file_path,
      user_id
    });
    //if a file is found, handle it
    if (foundFile) {
      return res.status(400).json({
        success: false,
        message: 'File already exists in your gallery',
        file: foundFile,
        path: thumb_file_path
      });
    }
    //if the file doesn't exist, add it to the gallery
    const galleryFile = new File({
      filename,
      obj_file_path,
      thumb_file_path,
      user_id,
      uploaded_at: new Date()
    });

    await galleryFile.save(function(err) {
      if (err) {
        return res.status(400).json({
          error: true,
          message: 'Error while saving new file',
          details: err
        });
      }
      return res.json(201).json({
        error: false,
        message: 'File added to your gallery'
      });
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(400).json({
        error: true,
        message: 'Incorrect path'
      });
    }
    return res.status(400).json({
      error: true,
      message: error
    });
  }
};
