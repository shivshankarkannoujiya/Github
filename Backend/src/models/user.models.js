import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        repositories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Repository',
                default: [],
            },
        ],

        followedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                default: [],
            },
        ],

        starRepos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Repository',
                default: [],
            },
        ],
    },
    { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
