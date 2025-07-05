import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import connectDB from './database/client.js';
import authRouter from './routes/auth.js';
import destinationRouter from './routes/destination.js';
import geocodeRouter from './routes/geocode.js';
import userRouter from './routes/user.js';

const PORT = process.env.PORT || 8080;
const app = express();
const __dirname = path.resolve();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://nomadconnect.up.railway.app', 
  credentials: true
}));

app.use('/images/profiles', express.static(path.resolve('public/images/profiles')));
app.use('/images/destinations', express.static(path.resolve('public/images/destinations')));

app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', destinationRouter);
app.use('/api', geocodeRouter);

app.get('/images', (req, res) => {
  fs.readdir('public/images', (err, files) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    res.send({ images: files });
  });
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
