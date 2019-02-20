import { Router } from 'express';

import { FileController } from '../controllers';

const FileRoutes = new Router();

//================ POST ==================//

FileRoutes.post('/users/:userId/gallery/upload', FileController.userFileUpload);

//================ GET ==================//
FileRoutes.get('/gallery', FileController.getGalleryFiles);

FileRoutes.get('/users/:userId/gallery', FileController.getUserGallery);

export default FileRoutes;
