import mongoose from 'mongoose';

const repoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
        },

        content: [
            {
                type: String,
            },
        ],

        visibility: {
            type: Boolean,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

        issues: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Issue',
            },
        ],
    },
    { timestamps: true }
);

export const Repository = mongoose.model('Repository', repoSchema);
