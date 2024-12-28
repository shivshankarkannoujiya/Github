import { Repository } from '../models/repo.models.js';

const createRepository = async (req, res) => {};
const getAllRepository = async (req, res) => {};
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
