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

        // TODO: update the User and Issue
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

const getAllRepository = async (_, res) => {
    try {
        const repositories = await Repository.find({})
            .populate('owner')
            .populate('issues');
        if (repositories.length === 0) {
            return res.status(404).json({
                message: 'No repository found',
            });
        }

        return res.status(200).json({
            repositories: repositories,
            message: 'Repositories fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching repos');
        return res.status(500).json({
            message: 'An error cooured while fetching repos',
            error: error.message,
        });
    }
};

const fetchRepositoryByID = async (req, res) => {
    const repo_Id = req.params.id;

    try {
        const repository = await Repository.findOne({ _id: repo_Id })
            .populate('owner')
            .populate('issues');

        if (!repository) {
            return res.status(404).json({
                message: 'repository not found',
            });
        }

        return res.status(200).json({
            repository: repository,
            message: 'Repository fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching repository by id: ', error);
        return res.status(500).json({
            message: 'An error occured while fetching repository by id',
            error: error.message,
        });
    }
};

const fetchRepositoryByName = async (req, res) => {
    const { name } = req.params;
    console.log('repo_Name: ', name);

    try {
        const repository = await Repository.findOne({ name: name })
            .populate('owner')
            .populate('issues');

        if (!repository) {
            return res.status(404).json({
                message: 'repository not found',
            });
        }

        return res.status(200).json({
            repository: repository,
            message: 'Repository fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching repository by name: ', error);
        return res.status(500).json({
            message: 'An error occured while fetching repository by name',
            error: error.message,
        });
    }
};

const fetchRepositoryForCurrentUser = async (req, res) => {
    const userId = req.user?._id;
    try {
        const repositories = await Repository.find({ owner: userId });
        if (!repositories || repositories.length === 0) {
            return res.status(404).json({
                message: 'No repository found',
            });
        }

        return res.status(200).json({
            repositories: repositories,
            message: 'User repositories fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching user repository: ', error);
        return res.status(500).json({
            message: 'An error occured while fetching User repository',
            error: error.message,
        });
    }
};

const updateRepositoryByID = async (req, res) => {
    const { id } = req.params;
    const { content, description } = req.body;

    try {
        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({
                message: 'Repository not found',
            });
        }

        repository.content = content;
        repository.description = description;

        const updatedRepository = await repository.save({
            validateBeforeSave: false,
        });

        return res.status(200).json({
            repository: updatedRepository,
            message: 'repository updated successfully',
        });
    } catch (error) {
        console.error('Error updating repository: ', error);
        return res.status(500).json({
            message: 'An error while updating repository',
            error: error.message,
        });
    }
};

const toggleVisibilityByID = async (req, res) => {
    const { id } = req.params;

    try {
        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).json({
                message: 'Repository not found',
            });
        }

        repository.visibility = !repository.visibility;
        const updatedRepository = await repository.save({
            validateBeforeSave: false,
        });

        return res.status(200).json({
            repository: updatedRepository,
            message: 'Repository visibility toggled successfully',
        });
    } catch (error) {
        console.error('Error toggling visibility: ', error);
        return res.status(500).json({
            message: 'An errro occured while toggling visibility',
            error: error.message,
        });
    }
};

const deleteRepositoryByID = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRepositoy = await Repository.findByIdAndDelete(id);
        if (!deletedRepositoy) {
            return res.status(404).json({
                message: 'Repositoy not found',
            });
        }

        return res.status(204).json({
            repository: deletedRepositoy,
            message: 'Repositoy deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting repository: ', error);
        return res.status(500).json({
            message: 'An error occured while deleting repository',
            error: error.message,
        });
    }
};

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
