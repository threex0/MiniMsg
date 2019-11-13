var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

const dataTypes = ['NULL','INTEGER','REAL','TEXT','BLOB'];

// This is something we should probably have in a ton of places going forward
function isset(obj){
    return typeof(obj) !== 'undefined';
}

// Make tables function needs to be moved to own SQL class eventually
// Todo: Add more sqlite table features via params
function makeTable(params = {}) {
    // Create a string from a passed list of columns assuming data is valid
    if(params.columns){
        cols = [];
        params.columns.forEach(function(column){
            if(dataTypes.indexOf(column.type) < 0){
                throw(column.type + " is not a valid data type");
            }
            cols.push(column.name + " " + column.type);
        })
        colStr = cols.join(",");
    }

    //Run the query
    db.run("CREATE TABLE " + params.table + " (" + colStr + ")");
}

// Insert a row of data
function insertRow(params){
    cols = [];
    vals = [];
    insert.fields.forEach(function(field){
        cols.push(field.column);
        vals.push(field.value);
    });
    colStr = cols.join(",");

    var stmt = db.prepare("INSERT INTO " + insert.table + " (" + colStr + ") VALUES (?)");
    stmt.run(vals);
    stmt.finalize();
}

// Select data
function selectData(params){
    fieldStr = params.fields.join(",");
    db.each("SELECT rowid AS id, " + fieldStr + " FROM " + params.table, function(err, row) {
        console.log(row.id + ": " + row.body);
    });
}

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
    db.serialize(function() {    
        makeTable(createTblParams);
        insertRow(insert);
        selectData(select);
        db.close();
    });    
} catch(err){
    console.log(err);
}