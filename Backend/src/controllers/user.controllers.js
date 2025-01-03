import { User } from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
    loginBodySchema,
    signupBodySchema,
} from '../validator/user.validator.js';

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
            userId: createdUser._id,
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

const loginUser = async (req, res) => {
    try {
        const { success, data } = loginBodySchema.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: 'Invalid Inputs !!',
            });
        }

        const { email, password } = data;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: 'User does not registered',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid Credentials',
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        });

        const loggedInUser = await User.findById({ _id: user._id }).select(
            '-password'
        );
        if (!loggedInUser) {
            return res.status(404).json({
                message: 'LoggedIn user not found !',
            });
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res.status(200).cookie('token', token, options).json({
            user: loggedInUser,
            userId: loggedInUser._id,
            token: token,
            message: 'User logged In Successfully',
        });
    } catch (error) {
        console.error('Error while logged In User: ', error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getAllUsers = async (_, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(404).json({
                message: 'No User found',
            });
        }

        return res.status(200).json({
            user: users,
            message: 'User fetched successfully',
        });
    } catch (error) {
        console.error('Error while fetching Users: ', error);
        return res.status(500).json({
            message: 'An Error occured while fetching users',
            error: error.message,
        });
    }
};

const getUserProfile = async (req, res) => {
    const userId = req.params.id;

    console.log('userID: ', userId);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            user: user,
            message: 'User profile fetched successfully',
        });
    } catch (error) {
        console.log('Error while fetching User profile by id: ', error);
        return res.status(500).json({
            message: 'Error during fetching User profile by ID',
            error: error.message,
        });
    }
};

const updateUserProfile = async (req, res) => {
    const userId = req.params.id;
    const { email, password } = req.body;

    try {
        const updateFields = { email };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: updateFields,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            user: updatedUser,
            message: 'User profile updated successfully',
        });
    } catch (error) {
        console.error('Error updating profile: ', error);
        return res.status(500).json({
            message: 'Error occured while updating user profile',
            error: error.message,
        });
    }
};

const deleteUserProfile = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status(204).json({
            deletedUser: deletedUser,
            message: `User profile deleted successfully`,
        });
    } catch (error) {
        console.error('Error deleting User: ', error);
        return res.status(500).json({
            message: 'An error occured while deleting User',
            error: error.message,
        });
    }
};

export {
    signupUser,
    loginUser,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
};
