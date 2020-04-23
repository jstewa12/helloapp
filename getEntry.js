const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const url = "mongodb+srv://jstewa12:JJStewart768@cluster0-l60ir.mongodb.net/test?retryWrites=true&w=majority";
app.get('/', function(req,res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            return
        }

        res.json(db.companies.find());
    })
}).listen(8080);
