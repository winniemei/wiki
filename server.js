var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var db = require('./db.js');

app.listen(3000);

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
  res.render('barsNew');
});


app.get('/bars/:id', function (req, res) {
  db.find('author', req.params.id, function (authorData) {
    db.findRelations('article', 'author_id', req.params.id, function (barsData) {
      var barObj = {
        bars: barsData[0],
        author: authorData
      };
      res.render('barsShow', barObj);
    });
  });
});

// app.get("/bars/:id", function (req, res) {
//   db.bothTablesWithArticleAuthorId('article', 'author', 'author_id', 'id', req.params.id, function(data){
//       console.log('data' + data);
//       console.log(data[0]);
//       var barObj = {
//         bars: data[0]
//       };
//       res.render('barsShow', barObj);
//     });
//   });



//CREATE NEW BAR

app.post("/bars/new", function (req, res) {
	var newObj = {
		title : req.body.title,
		time_edited : req.body.time_edited,
		img_url : req.body.img_url,
		article_text : req.body.article_text,
		author_id : req.body.author_id,
		category_id : req.body.category_id
	}
 db.create('article', newObj, function (data) {
 	console.log(data)
  res.redirect('/bars');
 });
});

//EDIT BAR

app.get('/bars/edit/:id', function (req, res) {
  db.find('article', req.params.id, function (barsData) {
  	console.log(barsData);
    var data = {
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



