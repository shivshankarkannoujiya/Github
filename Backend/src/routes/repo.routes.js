import { Router } from 'express';
import {
    createRepository,
    getAllRepository,
    fetchRepositoryByID,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryByID,
    toggleVisibilityByID,
    deleteRepositoryByID,
} from '../controllers/repo.controllers.js';

const router = Router();

router.route('/createRepo').post(createRepository);
router.route('/getAllRepo').put(getAllRepository);
router.route('/fetchRepo/:id').get(fetchRepositoryByID);
router.route('/fetchRepo/:name').get(fetchRepositoryByName);
router.route('/fetchRepo/:userId').get(fetchRepositoryForCurrentUser);
router.route('/update').put(updateRepositoryByID);
router.route('/toggle').patch(toggleVisibilityByID);
router.route('/createRepo').delete(deleteRepositoryByID);

export default router;
