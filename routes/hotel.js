import express from 'express';
import {verifyUser , verifyAdmin} from '../utils/verifyToken.js';

import {
    addHotel,
    updateHotel,
    getHotel,
    getAllHotels,
    deleteHotel,
    countOnCity,
    countOnType
} from '../controllers/hotel.js'

const router = express.Router();

router.post('/' ,verifyAdmin , addHotel);

router.put('/:id' ,verifyAdmin , updateHotel);

router.delete('/:id' ,verifyAdmin , deleteHotel);

router.get('/find/:id' , getHotel);

router.get('/' , getAllHotels);

router.get('/countOnCity' , countOnCity);

router.get('/countOnType' , countOnType);

export default router ;