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


app.get("/bars/:id", function (req, res) {
  db.find('article', req.params.id, function (barsData) {
    db.findRelations('article', 'author_id', req.params.id, function (authorData) {
      var barObj = {
        bars: barsData[0],
        author: authorData
      };
      res.render('barsShow', barObj);
    });
  });
});





