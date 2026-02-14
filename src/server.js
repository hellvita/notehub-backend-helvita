import express from 'express';

const app = express();
const PORT = Number.parseInt(process.env.PORT) || 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`Server is running on port: ${PORT}`);
});
