import { Router } from 'express';
import {
    signupUser,
    loginUser,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
} from '../controllers/user.controllers.js';

const router = Router();

router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/getAll').get(getAllUsers);
router.route('/getProfile').get(getUserProfile);
router.route('/updateProfile').put(updateUserProfile);
router.route('/deleteProfile').delete(deleteUserProfile);

export default router;
