import bucket from './firebase.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadToFirebase = async (fileBuffer, fileName, mimetype, folder = 'misc') => {
  const fullPath = `${folder}/${fileName}`;
  const blob = bucket.file(fullPath);

  const uuid = uuidv4();

  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: mimetype,
      metadata: {
        firebaseStorageDownloadTokens: uuid
      }
    }
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', reject);
    blobStream.on('finish', () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fullPath)}?alt=media&token=${uuid}`;
      resolve(publicUrl);
    });

    blobStream.end(fileBuffer);
  });
};