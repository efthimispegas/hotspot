import fs from 'fs';
import validator from 'validator';
import path from 'path';
import imagemagick from 'imagemagick';

import config from '../config/config';

const appDir = process.env.PWD ? process.env.PWD : process.cwd();

function randomStr() {
  let m = 12;
  let s = '';
  let r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < m; i++) {
    s += r.charAt(Math.floor(Math.random() * r.length));
  }
  return s;
}

function getFileExtension(filename) {
  return filename.substring(filename.lastIndexOf('.') + 1);
}

function resizeImage(absPath) {
  imagemagick.resize(
    {
      srcPath: absPath,
      dstPath: absPath,
      width: 256
    },
    function(err, stdout, stderr) {
      if (err) {
        throw err;
      }
    }
  );
}

export function checkFileName(filename) {
  if (filename !== undefined) {
    validator.escape(filename);
    return filename;
  } else {
    return randomStr();
  }
}

export function isEmptyObject(obj) {
  for (let property in obj) {
    return false;
  }
  return true;
}

export function objectLength(object) {
  let length = 0;
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
}

export function checkFilePath(filepath) {
  if (Number.isFinite(filepath)) {
    throw new Error('Incorrect file path');
  }
  const fileExists = fs.lstatSync(
    `${appDir}${config.PUBLIC_FOLDER}${filepath}`,
    function(err) {
      if (err) {
        return false;
      }
    }
  );
  if (!fileExists) {
    throw new Error('Incorrect file path');
  }
}

export function processFile(file) {
  return new Promise(function(resolve, reject) {
    if (file === undefined || !file.hasOwnProperty('path')) {
      reject('file not defined');
    }
    fs.readFile(file.path, function(err, data) {
      const filename = `${randomStr()}.${getFileExtension(
        file.originalFilename
      )}`;
      const relativePath = `${config.UPLOAD_FOLDER}/${filename}`;
      const absolutePath = `${appDir}/public/${relativePath}`;

      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        try {
          resizeImage(absolutePath);
        } catch (e) {
          throw new Error(e);
        }
      }
      fs.writeFile(absolutePath, data, function(err) {
        if (err) {
          reject(err);
        }
        resolve(`${config.DOMAIN_URL}/api/${relativePath}`);
      });
    });
  });
}
