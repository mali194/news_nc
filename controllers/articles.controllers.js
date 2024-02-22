const { selectArticlesById ,selectAllArticles, selectArticleComments, insertCommentArticle } = require("../models/articles.models");
const pool = require("../db/connection")

exports.getArticlesById = (req, res, next) => {
    const {article_id} = req.params;
    selectArticlesById(article_id)
         .then((article)=> {
          res.status(200).send({ article });
         })
         .catch(next);
};

exports.getArticleComments = (req, res, next) => {
   const {article_id} = req.params;

 selectArticleComments(article_id)
    .then(comments => {
     res.status(200).send(comments)
    })
    .catch(next);
}

exports.getAllArticles = (req, res, next) => {
   selectAllArticles()
      .then(allArticles => {
      res.status(200).send({ allArticles });
      })
      .catch(next);
};

exports.addComment = (req, res) => {
   const {article_id} = req.params;
   const requestBody = req.body;
   insertCommentArticle(article_id, requestBody)
   .then((comment) => {res.status(201).send( {comment} )})
};

