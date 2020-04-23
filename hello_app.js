const http = require('http');
const MongoClient = require('mongodb').MongoClient;

var port = process.env.PORT || 8080;
const url = "mongodb+srv://jstewa12:JJStewart768@cluster0-l60ir.mongodb.net/test?retryWrites=true&w=majority";
http.createServer((request, response) => {
    if(request.url === '/favicon.ico') {
        response.end();
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
        s.on("data", function(item) {
            console.log(item);
            response.write(JSON.stringify(item));
        });
        
        s.on("end", function() {
            console.log("end of data");
            console.log("Success!");
            response.end("Done!");
        });
    });
}).listen(port);
