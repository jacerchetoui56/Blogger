import {StatusCodes} from "http-status-codes"
import { Request, Response, NextFunction, ErrorRequestHandler } from "express" 
import CustomError from "../errors/CustomError"

const errorHandlerMiddleware = (err : Error, req:  Request, res: Response, next: NextFunction)=> {
    if(err instanceof CustomError){
        res.status(err.statusCode).json({success : false , message: err.message})
    }


    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success : false , message : 'an error is occured, please try again later'})
}



export default errorHandlerMiddleware
