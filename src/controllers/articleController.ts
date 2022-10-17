import mongoose from 'mongoose'
import {Response, Request} from 'express'
import Article from '../models/article.model'
import NotFoundError from '../errors/NotFoundError'

const addArticle  = async (req : Request, res : Response)=> {
    const {title, description, markdown} = req.body
    if(!title || !description || !markdown ){
        res.redirect('/articles/new')
    }
    const article = await Article.create({title , description, markdown})
    console.log(article);
    res.redirect(`/articles/${article.id}`)
    
}
const getArticle  = async (req : Request, res : Response)=> {
    const {id : articleId } = req.params
    const article = await Article.findById(articleId)
    if(!article) throw new NotFoundError('Article is Not Found')
    res.render(`articles/${articleId}`)
}


export {
    addArticle, getArticle
}