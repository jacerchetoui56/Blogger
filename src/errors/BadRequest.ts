import CustomError from "./CustomError";
import {StatusCodes} from 'http-status-codes'

class BadRequestError extends CustomError {
    constructor(message : string, statusCode : number = StatusCodes.BAD_REQUEST){
        super(message, statusCode)
    }
}


export default BadRequestError