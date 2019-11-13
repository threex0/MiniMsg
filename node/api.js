var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var db = require('./dbSqlite');
var mlib = require('./mlib');
var app = express();

const portNo = 8080;

// DB Config
const msgTableSchema = {
    table: 'message',
    columns: [{
        name: 'body',
        type: 'TEXT'
    },{
        name: 'title',
        type: 'TEXT'
    }]
}

db.makeTable(msgTableSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());

app.get("/", function (request, response){
    console.log('GET Request');

    // Select statement
    var selectParams = {
        table: 'message',
        fields: ['body', 'title'],
        limit: 100
    }

    db.serialize(function(){
        db.selectData( selectParams,
            function(rows){
                response.send(rows)
            }
        );
    });
});

app.post("/", function (request, response){
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    console.log('POST Request');
    console.log(request.body);

    if(mlib.isset(request.body.postMessage)){
        var insert = {
            table: 'message',
            fields: [{
                column: 'body',
                value: request.body.postMessage.body
            },{
                column: 'title',
                value: request.body.postMessage.title
            }]
        }

        db.insertRow(insert);
    }

    response.send("success");
});

console.log("API Listening on " + portNo)
app.listen(portNo);