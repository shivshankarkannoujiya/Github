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

const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find({});
        if (issues.length === 0) {
            return res.status(404).json({
                message: 'No Issue found',
            });
        }

        return res.status(200).json({
            message: 'Issues fetched successfully',
            Issues: issues,
        });
    } catch (error) {
        console.error('Error fetching Issues', error);
        return res.status(500).json({
            message: 'An error occured while fetching Issues',
            error: error.message,
        });
    }
};


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
