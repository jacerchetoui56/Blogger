import express, {Request, Response} from 'express'

const router = express.Router()
import {addArticle, getArticle, deleteArticle} from '../controllers/articleController'
import Article from '../models/article.model'

router.get('/new', (req : Request, res: Response)=> {
    res.render('articles/new', {article : new Article()})
})

router.post('/',addArticle)
router.get('/:slug',getArticle)
router.delete('/:id',deleteArticle)


export default router