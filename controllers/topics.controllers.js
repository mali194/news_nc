const { selectTopics } = require('../models/topics.models');
let endpoints= require('../endpoints.json');
const express = require('express');
const app= express();

exports.getApi= (req, res, next) => {
    const apiDescription= {};

    Object.keys(endpoints).forEach(endpoint => {
        const [method, path]= endpoint.split(' ');
        const { description: description, queries, exampleResponse } = endpoints[endpoint];

        if(!apiDescription[path]){
            apiDescription[path]= []
        }

        apiDescription[path].push({
            method,
            description,
            queries,
            exampleResponse
        });
    });
    res.status(200).send(apiDescription);
};

exports.getTopics= (req, res, next) => { 
    selectTopics().then(topics => {
        res.status(200).send({topics});
    }).catch(next) 
};


