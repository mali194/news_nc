const express = require('express')
const app= express()
const { getTopics, getApi} = require('./controllers/topics.controllers')
const {getArticlesById}= require('./controllers/article.controllers');

app.use(express.json())

app.get('/api/topics', getTopics);

app.get('/api', getApi);

app.get('/api/articles/:article_id', getArticlesById);


app.all('/api/*', (req, res) => {
 res.status(404).send({msg: 'not found!'})
})

/* app.use((err, req, res, next) => {
   if (err.code ==='22PO2'){
      res.status(400).send({msg:`Bad request`});
   } else {
   next(err)
   }
}); */

app.use((err, req, res) => {
   console.log(err)
});
module.exports= app; 

