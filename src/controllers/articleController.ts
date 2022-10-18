import { marked } from "marked";
import slugify from "slugify";
import { JSDOM } from "jsdom";
import createDomPurify from "dompurify";

const dompurify = createDomPurify((new JSDOM() as any).window);

import { Response, Request } from "express";
import Article from "../models/article.model";

const addArticle = async (req: Request, res: Response) => {
  const { title, description, markdown } = req.body;
  if (!title || !description || !markdown) {
    return res.render("articles/new", {
      article: { title, description, markdown },
    });
  }
  const article = await Article.create({ title, description, markdown });
  res.redirect(`/articles/${article.slug}`);
};

const getArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const article = await Article.findOne({ slug: slug });
    if (!article) return res.redirect("/");
    res.render(`articles/show`, { article: article });
  } catch (err) {
    res.redirect("/");
  }
};

const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const getArticleToEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id).select({
      title: 1,
      description: 1,
      markdown: 1,
    });
    if (!article) res.redirect("/");
    res.render("articles/edit", { article: article });
  } catch (error) {
    res.redirect("/");
  }
};

const editArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, markdown } = req.body;
    let slug : string = slugify(title, { lower: true, strict: true });
    let sanitzedHTML :string = dompurify.sanitize(marked(markdown));
  try {
    const article = await Article.findByIdAndUpdate(
      id,
      { title, description, markdown, sanitzedHTML , slug},
      { new: true, runValidators: true }
    );
    if (!article) res.redirect("/");
    res.redirect(`/articles/${article?.slug}`);
  } catch (error) {
    res.redirect("/");
  }
};

export { deleteArticle, getArticleToEdit, addArticle, getArticle, editArticle };
