const db = require('../db/connection.js');


exports.selectTopics = () => {
   return db.query(`SELECT * FROM topics`).then((result) => {
      const topics= result.rows;
      if(topics.length === 0){
        return Promise.reject({
         status:404,
         msg: 'no topics found'
        });
      };
      return topics
   })
};


