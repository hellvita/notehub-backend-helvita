import { Readable } from 'node:stream';
import { v2 as cloudinary } from 'cloudinary';

import { getEnv } from '../helpers/getEnv';
import { ENV_VARS } from '../constants/env';

cloudinary.config({
  secure: true,
  cloud_name: getEnv(ENV_VARS.Cloudinary.IMG_CLOUD_NAME),
  api_key: getEnv(ENV_VARS.Cloudinary.IMG_API_KEY),
  api_secret: getEnv(ENV_VARS.Cloudinary.IMG_API_SECRET),
});

export const saveFileToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'notehub-helvita/avatars',
        resource_type: 'image',
        overwrite: true,
      },
      (err, result) => (err ? reject(err) : resolve(result)),
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};
