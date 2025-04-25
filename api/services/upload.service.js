const { bucket } = require('../config/firebase');
const Upload = require('../models/Upload.model');
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

exports.uploadToFirebase = async (file, projectId, userId) => {
  try {
    const blob = bucket.file(`water-project/${projectId}/${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', err => {
        logger.error(`Firebase upload error: ${err}`);
        reject(new AppError('Error uploading file to storage', 500));
      });

      blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        
        const uploadRecord = await Upload.create({
          project: projectId,
          fileType: getFileType(file.mimetype),
          url: publicUrl,
          name: file.originalname,
          size: file.size,
          uploadedBy: userId
        });

        resolve({
          url: publicUrl,
          uploadId: uploadRecord._id
        });
      });

      blobStream.end(file.buffer);
    });
  } catch (err) {
    logger.error(`Error in uploadToFirebase: ${err.message}`);
    throw err;
  }
};

function getFileType(mimetype) {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  return 'document';
}