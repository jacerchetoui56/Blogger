import cors from 'cors'
import express, { Application } from 'express'
import ejs from 'ejs'
import path from 'path'
import mongoose from 'mongoose'
import articleRouter from './routes/articles'
import notFound from './errors/notFound'
import Article from './models/article.model'
import methodOverride from 'method-override'


const app : Application = express()
const port = process.env.PORT || 5002
app.use(cors())
app.use(express.urlencoded({ extended : false }))
app.use(express.json())
app.use(methodOverride('_method'))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use('/articles', articleRouter)

app.get('/', async (req, res)=> {
    const articles = await Article.find({}).sort({createdAt : -1})
    res.render('articles/index', {articles : articles})
})

app.use(notFound)

const start= async () =>{
    try  {
        mongoose.connect('mongodb://localhost:27017/blogger')
        app.listen(port , ()=> console.log(`Server is listening on port ${port}`))
    }catch(err){
        console.log(err)
    }
}

start();