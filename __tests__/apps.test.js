const request = require('supertest');
const app = require('../app.js');
const connect = require('../db/connection.js');
const data= require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const endpoints= require('../endpoints.json');

beforeEach(()=> seed(data));

afterAll(() => connect.end());


describe('all bad urls', () => {
    it('should respond with 404 and message not found!', ()=>{
        return request(app)
        .get('/api/notAnUrl')
        .expect(404)
        .then((res)=>{
            expect(res.body.msg).toBe(`not found!`)
            
        })
    })
})

describe('all bad urls', () => {
    it('should respond with 404 and message not found!', ()=>{
        return request(app)
        .get('/api/sksafd')
        .expect(404)
        .then((res)=>{
            expect(res.body.msg).toBe(`not found!`)
            
        })
    })
});

describe('GET /api/topics', () => {
    it('should respond with an array of all topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
            expect(res.body.topics.length).toBe(3);
            res.body.topics.forEach((topic)=> {
                expect(topic).toMatchObject({
                    description: expect.any(String),
                    slug: expect.any(String)
                })
            })
        });
    });
    
});

describe('GET /api', () => {
    it('respond with JSON containing all endpoints information', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((res) => {
            Object.values(res.body).forEach(endpoint => {
                expect(Array.isArray(endpoint)).toBe(true);
            })
            
        });
 
    });
});

describe('GET /api/articles/:article_id', () => {
    it('respond with correct article (i.e. with correct properties)', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((res) => {
            const article = res.body.article;
            expect(article).toHaveProperty('author');
            expect(article).toHaveProperty('title');
            expect(article).toHaveProperty('article_id');
            expect(article).toHaveProperty('body');
            expect(article).toHaveProperty('topic');
            expect(article).toHaveProperty('created_at');
            expect(article).toHaveProperty('votes');
               if ('article_img_url' in article) { 
                expect(typeof article.article_img_url === 'string' || Array.isArray(article.article_img_url)).toBeTruthy(); }
        });
    });
    
});
/*  describe('POST /api/articles/:article_id/comments', () => {
    it('respond with comment if posted successfully', () => {
        const post= 
        { username: 'butter_bridge',
         body: 'this is a comment'}
        return request(app)
        .post('/api/articles/1/comments')
        .send(post)
        .expect(201)
        .then((res) => {
            console.log(res.body)
            const postedComment= res.body.postedComment;
            expect(postedComment.article_id).toBe(1);
            /* expect(postedComment).toHaveProperty('body'); */
        })
    })
    /* it('give error status 400 when passed incorrect in', () => {
        
        return request(app)
        .post('/api/articles/1/comments')
        .expect((res) =>{
            expect(res.body).toEqual({
                error: {
                    status: 500,
                    message: 'internal Server Error'
                }
            })
        })
    }) */
 */
})
    /*     it('responds with error if ....', () => {

    }) */
//question 5.6//
/* describe('GET /api/articles', () => {
    it('respond with an array of all article objects)', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((res) => {
            const articles = res.body.article;
            expect(Array.isArray(articles)).toBe(true);
 
            articles.forEach(article =>{
                expect(article).toHaveProperty('author');
                expect(article).toHaveProperty('title');
                expect(article).toHaveProperty('article_id');
                expect(article).toHaveProperty('topic');
                expect(article).toHaveProperty('comment_count');
                expect(article).toHaveProperty('created_at');
                expect(article).toHaveProperty('votes');
                if ('article_img_url' in article) { 
                 expect(typeof article.article_img_url === 'string' || Array.isArray(article.article_img_url)).toBeTruthy(); }

            })
        });
    });
    
});

describe('GET /api/articles/:article_id/comments', () => {
    it('respond with array of comments for given article_id', () => {
        return request(app)
        .get('/api/articles/2/comments')
        .expect(200)
        .then((res) => {
            const comments=  res.body;
            expect(Array.isArray(endpoint)).toBe(true);
            comments.forEach(comment => {
                expect(comment).toHaveProperty('comment_id');
                expect(comment).toHaveProperty('votes');
                expect(comment).toHaveProperty('created_at');
                expect(comment).toHaveProperty('author');
                expect(comment).toHaveProperty('body');
                expect(comment).toHaveProperty('article_id');
            })
        })

    })
}) */