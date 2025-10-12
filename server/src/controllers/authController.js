import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const signToken = (user) =>
    jwt.sign(
        {
            sub: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        }
    );

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(409).json({ message: 'Email already in use' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
        token: signToken(user),
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
        token: signToken(user),
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
};

export const me = (req, res) => {
    res.json(req.user);
};
