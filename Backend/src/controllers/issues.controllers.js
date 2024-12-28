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

const getIssueById = async (req, res) => {
    const issueId = req.params.id;
    try {
        const issue = await Issue.findById(issueId);
        if (!issue) {
            return res.status(404).json({
                message: 'issue not found',
            });
        }

        return res.status(200).json({
            message: 'Issue fetched successfully',
            issue: issue,
        });
    } catch (error) {
        console.error('Error fetching issue by id: ', error);
        return res.status(500).json({
            message: 'An occured while fetching issue by id',
            error: error.message,
        });
    }
};

const updateIssueById = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            id,
            {
                $set: {
                    title: title,
                    description: description,
                    status: status,
                },
            },
            { new: true }
        );
        if (!updatedIssue) {
            return res.status(404).json({
                message: 'issue not found',
            });
        }

        return res.status(200).json({
            message: 'Isuue updated successfully',
            issue: updatedIssue,
        });
    } catch (error) {
        console.error('Error updating issue', error);
        return res.status(500).json({
            message: 'An error occured while updating issue',
            error: error.message,
        });
    }
};
const deleteIssueById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedIssue = await Issue.findByIdAndDelete(id);
        if (!deletedIssue) {
            return res.status(404).json({
                message: 'Issue not found',
            });
        }

        return res.status(204).json({
            message: 'Issue deleted successfully',
            issue: deletedIssue,
        });
    } catch (error) {
        console.error('Error deleting Issue');
        return res.status(500).json({
            message: 'An error occured while deleting Issue',
            error: error.message,
        });
    }
};

export {
    createIssue,
    getAllIssues,
    getIssueById,
    updateIssueById,
    deleteIssueById,
};
