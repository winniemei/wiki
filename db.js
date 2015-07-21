var pg = require('pg');
var dbUrl = 'pg://localhost/wiki_db'

module.exports = {
  end: function() {
    pg.end();
  },
  all: function(table, cb) {
    pg.connect(dbUrl, function(err, client, done) {
    if (err) {
        throw err
      }
      client.query('SELECT * FROM ' + table, function(err, result) {
        done();
        cb(result.rows);
      });
    });
    this.end();
  },
  find: function(table, id, cb) {
    pg.connect(dbUrl, function(err, client, done) {

      client.query('SELECT * FROM ' + table + ' WHERE id=' + id, function(err, result) {
        done();
        cb(result.rows);
      });
    });
    this.end();
  },
  create: function(table, obj, cb) {
    pg.connect(dbUrl, function(err, client, done) {
       if (err) {
          throw err
        }
      var keys = [];
      var values = [];
      var dollars = [];
      Object.keys(obj).forEach(function(key, i) {
        keys.push(key);
        values.push(obj[keys[i]]);
        dollars.push('$' + (i + 1));
      })
      var queryString = 'INSERT INTO ' + table + '(' + keys.join(',') + ') VALUES(' + dollars.join(',') + ')';
      client.query(queryString, values, function(err, result) {
        done();
        if (err) {
          console.error('error running query', err);
        }
        cb(result)
      });
    })
    this.end();
  },
  update: function(table, obj, id, cb) {
    pg.connect(dbUrl, function(err, client, done) {
      var keys = [];
      var set = [];
      var values = [];
      Object.keys(obj).forEach(function(key, i) {
        keys.push(key);
        set.push(key + '=($' + (i + 1) + ')');
        values.push(obj[keys[i]]); 
      });
      client.query('UPDATE ' + table + ' SET ' + set.join(',') + ' WHERE id=' + id, values, function(err, result) {
        done();
        if (err) {
          console.error('error running query', err);
        }
        cb(result);
      })
    })
    this.end();
  }, 
  delete: function (table, id, cb) {
    pg.connect(dbUrl, function (err, client, done) {
      client.query("DELETE FROM " + table + " WHERE id=" + id, function (err, result) {
        done();
        if(err){
          console.error("Couldn't make delete request", err)
        }
        cb(result);
      });
    });
    this.end();
  },
  findRelations: function (table1, column, id, cb) {
    pg.connect(dbUrl, function (err, client, done) {
      client.query('SELECT * FROM ' + table1 + ' WHERE ' + table1 + '.' + column + ' = ' + id, function (err, result) {
        done();
        if(err){
          console.error("Stupid relationships", err)
        }
        cb(result.rows);
      });
    });
    this.end();
  },
  bothTablesWithAuthorId: function (table1, table2, column1, column2, id, cb) {
    pg.connect(dbUrl, function (err, client, done) {
      client.query('SELECT * FROM ' + table1 + ' LEFT JOIN ' + table2 + ' ON ' + table1 + '.' + column1 + ' = ' + table2 + '.' + column2 + ' WHERE ' + table2 + 
        '.' + column2 + '=' + id, function (err, result) {
        done();
        if(err){
          console.error("Stupid relationships", err)
        }
        cb(result.rows);
      });
    });
    this.end();
  },
  bothTablesWithArticleAuthorId: function (table1, table2, column1, column2, id, cb) {
    pg.connect(dbUrl, function (err, client, done) {
      client.query('SELECT * FROM ' + table1 + ' LEFT JOIN ' + table2 + ' ON ' + table1 + '.' + column1 + ' = ' + table2 + '.' + column2 + ' WHERE ' + table1 + 
        '.' + 'id' + '=' + id, function (err, result) {
        console.log(result);
        console.log(result.rows);
        done();
        if(err){
          console.error("Stupid relationships", err)
        }
        cb(result.rows);
      });
    });
    this.end();
}
}