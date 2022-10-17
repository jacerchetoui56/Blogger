import mongoose from "mongoose";


const articleSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : [true , 'Please provide the title'],
        maxlength : 50
    },
    createdAt :  {
        type : Date,
        default : Date.now
    },
    description : {
        type : String, 
        required : [true, 'Please provide a description']
    },
    markdown  :{
        type : String, 
        require: [true , 'Please provide the markdown']
    }
})


export default mongoose.model('articles', articleSchema)