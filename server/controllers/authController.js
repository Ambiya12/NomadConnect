import User from "../model/User.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const createUser = async (req, res) => {
    console.log(req.body)
    const {first_name, last_name, email, password} = req.body;
    try {
        const emailVerification = await User.findOne({email});
        if (emailVerification) {
            return res.status(400).json('Email already exists');
        }
        const saltPassword = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltPassword);
        const newUser = await new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        newUser.save();
        return res.status(201).json({message: `Welcome ${first_name} to Nomad Connect`});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json('Email or Password Invalid');
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(404).json('Email or password invalid');
        }
        const token = await jwt.sign({id: user._id}, JWT_SECRET);
        return res.status(200).json(token);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
}