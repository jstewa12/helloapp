const http = require('http');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const url = "mongodb+srv://jstewa12:JJStewart768@cluster0-l60ir.mongodb.net/test?retryWrites=true&w=majority";
http.createServer((request, response) => {
    if(request.url === '/favicon.ico') {
        res.end();
        return;
    }

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            return;
        }

        var dbo = db.db("hw13");
        var coll = dbo.collection("companies");
        var s = coll.find().stream();
        s.on("data", function(item) {console.log(item)});
        s.on("end", function() {console.log("end of data"); db.close();});
        response.end();
    });
}).listen(8080);
