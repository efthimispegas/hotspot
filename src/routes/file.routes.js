import { Router } from 'express';
import multipartMiddleware from 'connect-multiparty';

import { FileController } from '../controllers';

const FileRoutes = new Router();
const multipart = multipartMiddleware();

//================ POST ==================//
FileRoutes.post('/form', multipart, FileController.fileUpload);

FileRoutes.post('/gallery/user', FileController.userFileUpload);

//================ GET ==================//
FileRoutes.get('/gallery', FileController.getGalleryFiles);

FileRoutes.get('/gallery/user/:userId', FileController.getUserGallery);

export default FileRoutes;
