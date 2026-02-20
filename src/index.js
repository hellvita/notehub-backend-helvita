import { connectMongoDB } from './db/connectMongoDB.js';
import { startServer } from './server.js';

await connectMongoDB();
startServer();
