import express from 'express';
import 'dotenv/config';
import cors from 'cors'
import connectDB from './database/client.js'

const PORT = process.env.PORT || 8000;

const app = express();
    

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();
app.listen(8000, () => {
    console.log(`Server is running on port 8000 ${PORT}`);
});