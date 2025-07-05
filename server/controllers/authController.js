import User from "../model/User.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { uploadToFirebase } from "../utils/uploadToFirebase.js";

let refreshTokens = [];
const JWT_SECRET = process.env.JWT_SECRET;

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    refreshTokens.push(refreshToken);
    return refreshToken;
};

export const createUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
      const emailVerification = await User.findOne({ email });
      if (emailVerification) return res.status(400).json('Email already exists');
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      let profilePictureUrl = '';
      if (req.file) {
        const fileName = `${Date.now()}-${req.file.originalname}`;
        profilePictureUrl = await uploadToFirebase(req.file.buffer, fileName, req.file.mimetype, 'profiles');
      }
  
      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        profile_picture: profilePictureUrl
      });
  
      await newUser.save();
  
      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);
  
      return res.status(201).json({
        message: `Welcome ${first_name} to Nomad Connect`,
        accessToken,
        refreshToken
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json('Internal server error');
    }
  };

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json('Email or password invalid');
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};

export const logoutUser = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    return res.status(200).json({ message: 'Logged out successfully' });
};

export const refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    try {
        const user = jwt.verify(refreshToken, JWT_SECRET);
        const newAccessToken = generateAccessToken(user);
        return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).json({ message: 'Token expired or invalid' });
    }
};