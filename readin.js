const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

fs.readFile('./companies.csv', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return
    }

    const url = "mongodb+srv://jstewa12:JJStewart768@cluster0-l60ir.mongodb.net/test?retryWrites=true&w=majority"
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            return
        }

        var hw13 = db.db("hw13");
        var companies = hw13.collection("companies");
        companies.remove();

        var lines = data.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var words = lines[i].split(',');
            companies.insertOne({name:words[0], ticker:words[1]});
            console.log(words);
        }
        var found = companies.findOne();
        console.log("Success!");
    })
})
