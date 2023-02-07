import User from '../models/User.js' ;
import bcrypt from 'bcrypt' ;
import  {AppError}  from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const register = async(req , res ,next) => {

    
    try {

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password: hashPassword,
        })

        await newUser.save();
        res.status(200).send("user created successfully .")
    } 
    
    catch(error) {
        next(error);
    }
}

export const login = async(req , res , next) => {

    try {

        const user = await User.findOne({username: req.body.username});
        if(! user)  return next(AppError("user not found",404)) 

        const validPassword = await bcrypt.compare(req.body.password , user.password); 
        if(! validPassword) return next( AppError("username or password are not correct .",400))

        const token = jwt.sign({id : user._id , isAdmin : user.isAdmin} , process.env.JWT_SECRET )

        const {password , isAdmin , ...otherDetails} = user._doc ;

        res.
        cookie("accessToken" , token , { httpOnly: true})
        .status(200).json({
            status : "success",
            data : otherDetails ,
        })

        
    }

    catch(error) {
        next(error);
    }

}