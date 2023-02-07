import express, { response } from 'express';
import {verifyUser , verifyAdmin} from '../utils/verifyToken.js';
import {
    updateUser,
    getUser,
    getAllUsers,
    deleteUser
} from '../controllers/user.js'

const router = express.Router();


router.put('/:id' ,verifyUser ,updateUser);

router.delete('/:id',verifyUser,deleteUser);

router.get('/:id',verifyUser , getUser);

router.get('/' ,verifyAdmin, getAllUsers);


export default router ;