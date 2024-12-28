import Router from 'express';
import {
    createIssue,
    getAllIssues,
    getIssueById,
    updateIssueById,
    deleteIssueById,
} from '../controllers/issues.controllers.js';

const router = Router();

router.route('/issue/create').post(createIssue);
router.route('/issue/all').get(getAllIssues);
router.route('/issue/:id').get(getIssueById);
router.route('/issue/update/:id').put(updateIssueById);
router.route('/issue/delete/:id').delete(deleteIssueById);

export default router;
