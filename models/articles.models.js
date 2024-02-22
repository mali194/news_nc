
const db = require("../db/connection.js")


exports.selectArticlesById = (article_id) => {
   return db.query( 
    `SELECT * FROM articles
     WHERE article_id = $1`,
     [article_id])
     .then((result) => {
       const article = result.rows[0];
       if(!article) {
         return Promise.reject({
            status: 404,
            msg: 'no article found with given id'
         });
       }
        return article;
      });
 };

 exports.selectAllArticles = () => {
    return db.query(
       `SELECT 
        articles.author,
        articles.title,
        articles.topic,
        articles.article_id,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
       COUNT(comments.article_id) AS comment_count
       FROM 
        articles
       LEFT JOIN
        comments ON articles.article_id = comments.article_id
       GROUP BY 
        articles.article_id
       ORDER BY
       articles.created_at DESC`
       )
       .then((result) => {
          const articles= result.rows;
          if(articles.length ===0) {
             return Promise.reject({
                status: 404,
                msg: 'no articles available',
             });
          }
          return articles;
        });
 };

exports.selectArticleComments = (article_id) => {
  return db.query(
   `SELECT
    comment_id,
    votes,
    created_at,
    author,
    body
    FROM 
     comments
    WHERE
     article_id=$1
    ORDER BY 
    created_at DESC`,[article_id]).then((result ) => {
    const comments= result.rows;
    if(comments.length === 0) {
      return Promise.reject({
         status: 404,
         msg: 'no comments found for that article'
      })
    }
    return comments;
   })
}

exports.insertCommentArticle = (article_id,  {username, body}) => {

   return db.query (
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *`,
   [article_id, username, body])
   .then(({rows}) => {
         return rows[0];
   })
   };
