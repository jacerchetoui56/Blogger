import CustomError from "./CustomError";
import {StatusCodes} from 'http-status-codes'

class NotFoundError extends CustomError {
    constructor(message : string, statusCode : number = StatusCodes.NOT_FOUND){
        super(message, statusCode)
    }
}


export default NotFoundError