import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import connectDB from './database/client.js';
import authRouter from './routes/auth.js';
import destinationRouter from './routes/destination.js';
import geocodeRouter from './routes/geocode.js';
import userRouter from './routes/user.js';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.resolve('public/images')));

app.use('/api', authRouter, userRouter, destinationRouter, geocodeRouter); 

app.get ('/public/images/:filename', (req, res) => {
  const file = `public/images/${req.params.filename}`;
  res.sendFile(path.resolve(file));
});

app.get('/images', (req, res) => {
  fs.readdir('public/images', (err, files) => {
      if (err) {
          return res.status(500).send({ error: err});
      }
      res.send({ images: files });
  });
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
