import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import cookieParser from 'cookie-parser';

import router from './routes/index.js';

import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';

export const startServer = () => {
  const app = express();
  const PORT = Number.parseInt(process.env.PORT) || 3000;

  app.use(logger);
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(router);

  app.use(notFoundHandler);
  app.use(errors());
  app.use(errorHandler);

  app.listen(PORT, (error) => {
    if (error) {
      console.error(error);
    }
    console.log(`🔗 Server is running on port: ${PORT}`);
  });
};
