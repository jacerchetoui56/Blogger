import express, {Request, Response} from 'express'

const router = express.Router()
import {addArticle, getArticle} from '../controllers/articleController'

router.get('/new', (req : Request, res: Response)=> {
    res.render('articles/new')
})

router.post('/',addArticle)
router.get('/:id',getArticle)


export default router