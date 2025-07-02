import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const getStorage = (folder) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/images/${folder}`);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
};

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'));
  }
};

export const uploadProfileImage = multer({
  storage: getStorage('profiles'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

export const uploadDestinationImages = multer({
  storage: getStorage('destinations'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});