var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var db = require('./db.js');

app.listen(3000);
// app.set('port', (process.env.PORT || 3000));
// app.listen(app.get('port', function(){
//   console.log("App running on port : ", app.get('port'))
// })

app.engine('handlebars', exphbs({defaultLayout: 'main', extname: 'handlebars'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger('dev'));

app.use(methodOverride(function (req, res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.get('/', function (req, res) {
    res.render('home')
});

app.get('/bars', function (req, res) {
  db.all('article', function (data) {
    var bars = {
      bars: data
    }
    res.render('barsIndex', bars);
  });
});


app.get('/bars/new', function (req, res) {
  db.all('author', function (authors) {
    db.all('category', function (category) {
      var data = {
        authors: authors,
        categories: category
      }
      res.render('barsNew', data);
    })
  })
});


app.get('/bars/:id', function (req, res) {
  var id = req.params.id;
  db.find('article', id, function (bar) {
    var query = 'SELECT * FROM author WHERE id=' + bar[0].author_id;
    db.query(query, function (author) {
      var data = {
        author: author[0], 
        bars: bar[0]
      };
      console.log(data)
      res.render('barsShow', data)
    })
  })
});

//CREATE NEW BAR

app.post("/bars/new", function (req, res) {
  db.create('article', req.body, function (data) {
     console.log(data)
     res.redirect('/bars');
  });
});

//EDIT BAR

app.get('/bars/edit/:id', function (req, res) {
  db.find('article', req.params.id, function (barsData) {
      console.log(barsData);
    var data = {
      id: req.params.id,
      bars: barsData[0]
    }
    res.render('barsEdit', data);
  });
});

app.put("/bars/:id", function (req, res) {
        var editedObj = {
        title : req.body.title,
        time_edited : req.body.time_edited,
        img_url : req.body.img_url,
        article_text : req.body.article_text,
        author_id : req.body.author_id,
        category_id : req.body.category_id
    }
 db.update('article', editedObj, req.params.id, function (data) {
   res.redirect('/bars/' + req.params.id);
 });
});

//DELETE BAR

app.delete("/bars/:id", function (req, res) {
 db.delete('article', req.params.id, function (data) {
  res.redirect('/bars');
 });
});