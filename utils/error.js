export const AppError = (message , status) => {
    const error = new Error();
    error.message = message;
    error.status = status;
    
    return error ;
}

