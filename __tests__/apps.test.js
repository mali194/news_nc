const request = require('supertest');
const app = require('../app.js');
const connect = require('../db/connection.js');
const data= require('../db/data/test-data');
const seed = require('../db/seeds/seed.js');
const endpoints= require('../endpoints.json');

beforeEach(()=> seed(data))
afterAll(() => connect.end());


describe('all bad urls', () => {
    it('should respond with 404 and message not found!', ()=>{
        return request(app)
        .get('/api/sksafd')
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


//make request to app
//to end /api
//in test expect (200) and res.body toEqual endpoints (var from ab)

        //listen for endpoint/api in app.js 
        //on this endpoint invoke getApi controller
        // in controller file require endpoints.json-same as ab
        //in controller send status(200) and send endpoints.json
 
