import { Response, Request } from "express";
import Article from "../models/article.model";

const addArticle = async (req: Request, res: Response) => {
  const { title, description, markdown } = req.body;
  if(!title || !description || !markdown ){
    return res.render('articles/new', {article : {title , description, markdown}})
  }
  const article = await Article.create({ title, description, markdown });
    res.redirect(`/articles/${article.slug}`);
};


const getArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const article = await Article.findOne({slug : slug});
    if(!article) return res.redirect('/')
    res.render(`articles/show`, {article : article});
  }catch(err){
    res.redirect('/')
  }
};


const deleteArticle = async (req : Request, res : Response)=> {
    const {id } = req.params
    try {
      const article = await Article.findByIdAndDelete(id)
      res.redirect('/')
    }catch(err){
      console.log(err);
    }
}

export {deleteArticle, addArticle, getArticle };
