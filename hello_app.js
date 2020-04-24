const adr = require('url');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;

var port = process.env.PORT || 8080;
const url = "mongodb+srv://jstewa12:JJStewart768@cluster0-l60ir.mongodb.net/test?retryWrites=true&w=majority";
http.createServer((request, response) => {
    if(request.url === '/favicon.ico') {
        response.end();
        return;
    }

    var compQuery = adr.parse(request.url, true).query;
    var txt = compQuery.txt;
    var type = compQuery.type;

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            return;
        }

        var dbo = db.db("hw13");
        var coll = dbo.collection("companies");
        var s = coll.find().stream();
        s.on("data", function(item) {
            if (item["ticker"] != null) {
                if (type == "Company Name") {
                    if (item["name"] == txt) {
                        response.write(item["name"] + ", " + item["ticker"] + "\n");
                    }
                } else if (type == "Stock Ticker") {
                    if (item["ticker"] == txt) {
                        response.write(item["name"] + ", " + item["ticker"] + "\n");
                    }
                }
            }
        });

        s.on("end", function() {
            response.end();
        });
    });
}).listen(port);
