import validator from 'validator';

import { File, User } from '../models';
import {
  checkFileName,
  checkFilePath,
  processFile,
  objectLength,
  querySetup,
  createId,
  isEmptyObject
} from '../helpers';

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

/** [Working as expected] */
export const getUserGallery = async (req, res) => {
  const { userId } = req.params;

  try {
    const q = querySetup(req);
    const query = { user_id: userId };
    const options = {
      limit: q.limit,
      offset: q.offset
    };

    const { docs, limit, offset, total } = await File.paginate(query, options);

    if (!docs) {
      return res.status(400).json({
        success: false,
        message: `Requested gallery from user - ${userId} not found`
      });
    }
    return res.status(200).json({
      success: true,
      message: `Succesfully fetched gallery from user - ${userId}`,
      gallery: docs
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: `Error while fetching the gallery form user with id - ${userId}`
    });
  }
};

/** [Working as expected] */
export const userFileUpload = async (req, res) => {
  if (isEmptyObject(req.body)) {
    return res.status(400).json({
      success: false,
      message: 'Nothing to post'
    });
  }

  const { user_id } = req.body;
  let uri = null;
  if (req.body.uri) {
    uri = req.body.uri;
  }
  try {
    const foundFile = await File.findOne({
      uri,
      user_id
    });
    //if a file is found, handle it
    if (foundFile) {
      return res.status(400).json({
        success: false,
        message: 'File already exists in your gallery',
        file: foundFile,
        uri
      });
    }
    //if the file doesn't exist, add it to the gallery
    const galleryFile = new File({
      uri,
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
      return res.status(201).json({
        success: true,
        message: 'File added to your gallery'
      });
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error
    });
  }
};
