var db = require('../dbSqlite');

// * Setup Tables * //

// Some default SQLITE params
// Table
var createTblParams = {
    table: 'message',
    columns: [{
        name: 'body',
        type: 'TEXT'
    }]
}

// Inserts
var insert = {
    table: 'message',
    fields: [{
        column: 'body',
        value: 'test'
    }]
}

// Select statement
var select = {
    table: 'message',
    fields: ['body'],
    limit: 100
}

try{
    db.serialize(function(){
        db.makeTable(createTblParams); 
        db.insertRow(insert);
        db.selectData(select);
    })
} catch(err){
    console.log(err);
}