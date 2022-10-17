// import dotenv from 'dotenv'
// dotenv.config()
import cors from 'cors'
import 'express-async-errors'
import express, { Application } from 'express'
import ejs from 'ejs'
import path from 'path'
import mongoose from 'mongoose'
import articleRouter from './routes/articles'
import notFound from './errors/notFound'
import ErrorHandlerMiddleware from './middlewares/errorHandler'

const app : Application = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.urlencoded({ extended : false }))
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use('/articles', articleRouter)

app.get('/', (req, res)=> {
    const articles = [{
        title : 'test title', 
        createdAt : new Date(),
        description : "test description"
    }, 
    {
        title : 'test title2', 
        createdAt : new Date(),
        description : "test description2"
    }]
    res.render('articles/index', {articles : articles})
})

app.use(notFound)
app.use(ErrorHandlerMiddleware)

const start= async () =>{
    try  {
        mongoose.connect('mongodb://localhost:27017/blogger')
        app.listen(port , ()=> console.log(`Server is listening on port ${port}`))
    }catch(err){
        console.log(err)
    }
}

start();