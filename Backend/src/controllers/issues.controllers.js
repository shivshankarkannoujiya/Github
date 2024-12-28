import { Issue } from '../models/issues.models.js';

const createIssue = async (req, res) => {
    const { title, description } = req.body;
    const repoId = req.params.id;

    try {
        console.log('RepoID: ', repoId);

        if (!title || !description) {
            return res.status(411).json({
                message: 'All fields are required',
            });
        }

        const newIssue = Issue.create({
            title,
            description,
            repository: repoId,
        });

        return res.status(201).json({
            Issue: newIssue,
            message: 'Issue created successfully',
        });
    } catch (error) {
        console.error('Error creating Issue: ', error);
        return res.status(500).json({
            message: 'An error occured while creating issue',
            error: error.message,
        });
    }
};

const getAllIssues = async (req, res) => {};
const getIssueById = async (req, res) => {};

const updateIssueById = async (req, res) => {};
const deleteIssueById = async (req, res) => {};

export {
    createIssue,
    getAllIssues,
    getIssueById,
    updateIssueById,
    deleteIssueById,
};
