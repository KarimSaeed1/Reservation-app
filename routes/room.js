import express from 'express';
import {verifyUser , verifyAdmin} from '../utils/verifyToken.js';

import {
    addRoom,
    updateRoom,
    getRoom,
    getAllRooms,
    deleteRoom,
    updateRoomAvailbility,
} from '../controllers/room.js'

const router = express.Router();

router.post('/:hotelid', verifyAdmin ,addRoom);

router.put('/:id', verifyAdmin ,updateRoom);

router.put('/availability/:id',updateRoomAvailbility);

router.delete('/:id/:hotelid', verifyAdmin , deleteRoom);

router.get('/:id' , getRoom);

router.get('/' , getAllRooms);


export default router ;