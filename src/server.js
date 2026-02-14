import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';

import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();
const PORT = Number.parseInt(process.env.PORT) || 3000;

app.use(logger);
app.use(cors());

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`🔗 Server is running on port: ${PORT}`);
});
