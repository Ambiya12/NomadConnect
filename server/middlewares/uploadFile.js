import multer from 'multer';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'));
  }
};

const memoryStorage = multer.memoryStorage();

export const uploadProfileImage = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

export const uploadDestinationImages = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});