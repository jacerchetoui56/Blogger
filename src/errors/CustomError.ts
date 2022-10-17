import {StatusCodes} from 'http-status-codes'


class CustomError extends Error{
    constructor(public message : string, public statusCode : number = StatusCodes.INTERNAL_SERVER_ERROR ){
        super(message)
    }
}


export default CustomError