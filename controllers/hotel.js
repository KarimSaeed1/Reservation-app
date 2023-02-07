import Hotel from '../models/Hotel.js'

export const addHotel = async(req , res ,next) => {

    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();

        res.status(200).json(savedHotel)
    }   
    catch (error) {
        next(error);
    } 

}

export const updateHotel = async(req , res ,next) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set : req.body} , {new : true});

        res.status(200).json(updatedHotel)
    }   
    catch (error) {
        next(error);
    } 

}

export const getHotel = async(req , res ,next) => {

    try {
        const hotel = await Hotel.find({id : req.params.id});

        res.status(200).json(hotel)
    }   
    catch (error) {
        next(error)
    } 

}

export const getAllHotels = async(req , res ,next) => {

    const {min , max , ...others} = req.query;
    try {
        const hotels = await Hotel.find({
            ...others ,
             cheapestPrice : {$gt : min|1 , $lt : max|999}})
             .limit(req.query.limit);

        res.status(200).json({
            status : "success",
            num : hotels.length,
            data : hotels
        })
    }   
    catch (error) {
        next(error)
    } 

}

export const deleteHotel = async(req , res ,next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);

        res.status(200).json("hotel deleted successfully")
    }   
    catch (error) {
        next(error);
    } 

}

export const countOnCity = async(req , res ,next) => {

    var cities ;

    if(req.query.cities)  cities = req.query.cities.split(",")
    

    try {
        const list =await Promise.all(cities.map(city => {

            return Hotel.countDocuments({city:city});

        }))

        res.status(200).json(list);
    }   
    catch (error) {
        next(error)
    } 

}

export const countOnType = async(req , res ,next) => {

    var types ;

    if(req.query.types)  types = req.query.types.split(",")
    

    try {
        const list =await Promise.all(types.map(type => {

            return Hotel.countDocuments({type:type});

        }))

        res.status(200).json(list);
    }   
    catch (error) {
        next(error)
    } 

}