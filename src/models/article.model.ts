import mongoose from "mongoose";
import {marked} from 'marked'
import slugify from "slugify";
import {JSDOM} from 'jsdom'
import createDomPurify from 'dompurify'

const dompurify = createDomPurify((new JSDOM() as any).window)

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
    }, 
    slug : {
        type : String, 
        required:  true, 
        unique : true 
    }, 
    sanitzedHTML : {
        type : String,
        required: true
    }
})

articleSchema.pre('validate', function(next){
    if(this.title) {
        this.slug = slugify(this.title, {lower : true , strict: true})
    }

    if(this.markdown){
        this.sanitzedHTML = dompurify.sanitize(marked(this.markdown))
    }
    next()
})



export default mongoose.model('articles', articleSchema)