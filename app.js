const express = require('express');
const app = express();
const { getTopics, getApi} = require('./controllers/topics.controllers');
const { getArticleComments, getAllArticles, getArticlesById, addComment }= require('./controllers/articles.controllers.js');

app.use(express.json()) ;

app.get('/api/topics', getTopics);

app.get('/api', getApi);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id/comments', getArticleComments);

app.post('/api/articles/:article_id/comments', addComment);


app.all('/api/*', (req, res) => {
 res.status(404).send({msg: 'not found!'})
});

app.use((err, req, res, next) => {
   console.log(err);
   res.status(400).send({msg: 'bad request!'})
   })

app.use((err, req, res, next) => {
   console.log(err),
   res.status(500).send({msg: `internal server Error!`})
});


module.exports = app;



