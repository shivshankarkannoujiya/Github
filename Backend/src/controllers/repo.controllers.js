import { Repository } from '../models/repo.models.js';
import { User } from '../models/user.models.js';
import { Issue } from '../models/issues.models.js';
import mongoose from 'mongoose';

const createRepository = async (req, res) => {
    try {
        const { name, description, content, visibility, owner, issues } =
            req.body;

        if (!name) {
            return res.status(411).json({
                message: 'Reppository name is required',
            });
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(411).json({
                message: 'Invalid userId',
            });
        }

        const newRepository = await Repository.create({
            name,
            description,
            content,
            visibility,
            owner,
            issues,
        });

        return res.status(201).json({
            createdRepo: newRepository,
            message: 'Repository created successfully',
        });
    } catch (error) {
        console.error('Error creating Repository');
        return res.status(500).json({
            message: 'An error occured while creating reppository',
            error: error.message,
        });
    }
};

const getAllRepository = async (req, res) => {
    
};


const fetchRepositoryByID = async (req, res) => {};
const fetchRepositoryByName = async (req, res) => {};
const fetchRepositoryForCurrentUser = async (req, res) => {};
const updateRepositoryByID = async (req, res) => {};
const toggleVisibilityByID = async (req, res) => {};
const deleteRepositoryByID = async (req, res) => {};

export {
    createRepository,
    getAllRepository,
    fetchRepositoryByID,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryByID,
    toggleVisibilityByID,
    deleteRepositoryByID,
};
