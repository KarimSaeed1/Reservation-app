import jwt from 'jsonwebtoken';
import {AppError} from './error.js'

export const verifyToken = (req , res ,next ) => {

    const token = req.cookies.accessToken ;
    if(!token ) return next(AppError(" please sign up " , 401));

    jwt.verify(token , process.env.JWT_SECRET, (err,user) => {

        if(err) return next(AppError("token is not valid" , 403));
        req.user = user ;
        next();
    });

}

export const verifyUser = (req  , res , next ) => {
    verifyToken(req , res ,next ,  () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else {
            return next(AppError("you are not authorized" , 403));
        }
    })
}

export const verifyAdmin = (req  , res , next ) => {
    verifyToken(req , res ,next ,  () => {
        if(req.user.isAdmin){
            next();
        }
        else {
            return next(AppError("you are not authorized" , 403));
        }
    })
}