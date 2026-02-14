import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';

import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';

import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();
const PORT = Number.parseInt(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(authRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`🔗 Server is running on port: ${PORT}`);
});
