var sqlite3 = require('sqlite3').verbose();
var Promise = require('promise');

module.exports = {
    db: new sqlite3.Database(':memory:'),
    dataTypes: ['NULL','INTEGER','REAL','TEXT','BLOB'],
    results: [],

    // Extend DB serialize function, probably a better way to do this, I don't know
    serialize: function(func){
        this.db.serialize(function(){
            func()
        })
    },

    open: function(){
        this.db = new sqlite3.Database(':memory:');
    },

    close: function(){
        this.db.close();
    },

    // This is something we should probably have in a ton of places going forward
    isset: function(obj){
        return typeof(obj) !== 'undefined';
    },

    // Make tables function needs to be moved to own SQL class eventually
    // Todo: Add more sqlite table features via params
    makeTable: function(params = {}) {
        // Create a string from a passed list of columns assuming data is valid
        if(params.columns){
            cols = [];
            params.columns.forEach((column) => {
                if(this.dataTypes.indexOf(column.type) < 0){
                    throw(column.type + " is not a valid data type");
                }
                cols.push(column.name + " " + column.type);
            })
            colStr = cols.join(",");
        }

        //Run the query
        this.db.run("CREATE TABLE " + params.table + " (" + colStr + ")");
    },

    // Insert a row of data
    insertRow: function(params){
        cols = [];
        vals = [];
        params.fields.forEach(function(field){
            cols.push(field.column);
            vals.push(field.value);
        });
        colStr = cols.join(",");
        paramStr = Array.apply(0,Array(params.fields.length));
        paramStr.fill("?", 0, params.fields.length);

        var stmt = this.db.prepare("INSERT INTO " + params.table + " (" + colStr + ") VALUES (" + paramStr + ")");
        stmt.run(vals);
        stmt.finalize();
    },

    // Select data
    selectData: function (params, func){
        fieldStr = params.fields.join(",");
        let sql = "SELECT rowid AS id," + fieldStr + " FROM " + params.table;
        
        var data = [];
        this.db.all(sql, function(err,rows){
            func(rows);
        })
    }
}