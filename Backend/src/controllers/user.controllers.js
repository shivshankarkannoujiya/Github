import { User } from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { signupBodySchema } from '../validator/user.validator.js';

const signupUser = async (req, res) => {
    try {
        const { success, data } = signupBodySchema.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: 'Invalid inputs, Please provide valid inputs',
            });
        }

        const { username, email, password } = data;

        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already Exist with usename or email',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            repositories: [],
            followedUsers: [],
            starRepos: [],
        });

        const createdUser = await User.findById(user._id).select('-password');
        if (!createdUser) {
            return res.status(500).json({
                message: 'Error while creating User',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY }
        );

        return res.status(201).json({
            user: createdUser,
            token: token,
            message: 'User created successfully!!',
        });

    } catch (error) {
        console.error('Error while registering User: ', error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {};
const getAllUsers = async (req, res) => {};

const getUserProfile = async (req, res) => {};
const updateUserProfile = async (req, res) => {};
const deleteUserProfile = async (req, res) => {};

export {
    signupUser,
    loginUser,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
};
