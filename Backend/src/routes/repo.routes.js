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
router.route('/getAllRepo').get(getAllRepository);
router.route('/fetchRepo/:id').get(fetchRepositoryByID);
router.route('/fetchRepo/name/:name').get(fetchRepositoryByName);
router.route('/fetchRepo/user/:userId').get(fetchRepositoryForCurrentUser);
router.route('/update').put(updateRepositoryByID);
router.route('/toggle').patch(toggleVisibilityByID);
router.route('/deleteRepo/:id').delete(deleteRepositoryByID);

export default router;
