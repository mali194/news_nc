const { selectArticlesById } = require('../models/article.models');

exports.getArticlesById = (req, res, next) => {
    const {article_id} = req.params;
         selectArticlesById(article_id)
         .then((article)=> {
            res.status(200).send({ article });
         })
         .catch(console.log)
};
