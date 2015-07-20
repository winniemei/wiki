var db = require('./db.js');


var author = ['Winnie Mei', 'Ruby Pradhan']
var titles = ['Raines Law Room', 'Angels Share']

var image = [
  'http://nightlifeinnewyorkcity.com/wp-content/gallery/raines-law-room-william/raines-law-room-william-inside.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyG2LmXgijkT5PSvfdhnbmFWkP_CSNC7i57Z7hG9trqSSFpe1DrA'
]

var articletext = ['Raines Law Rooms strawberry kiss drink is amazing.', 'Angels Share is amazing.']

var time = ['Whatever', 'Whatever']

var categories = ['Bars', 'Clubs']
var emails = ['winniemei@gmail.com', 'ruby@gmail.com']
var locations = ['Manhattan', 'Manhattan']


var rainesCategory = {
  name: categories[0]
}

var rainesAuthor = {
  author_name: author[0],
  email: emails[0],
  location: locations[0]

}

var raines = {
  title: titles[0],
  time_edited: time[0],
  img_url: image[0],
  article_text: articletext[0],
  author_id: 1,
  category_id: 1
}


db.create('category', rainesCategory, function (category) {
  db.create('author', rainesAuthor, function (author) {
    db.create('article', raines, function (article) {
      console.log(article)
    });
  });
});

var angelsCategory = {
  name: categories[1]
}

var angelsAuthor = {
  author_name: author[1],
  email: emails[1],
  location: locations[1]

}

var angels = {
  title: titles[1],
  time_edited: time[1],
  img_url: image[1],
  article_text: articletext[1],
  author_id: 2,
  category_id: 2
}

db.create('category', angelsCategory, function (category) {
  db.create('author', angelsAuthor, function (author) {
    db.create('article', angels, function (article) {
      console.log(article)
    });
  });
});

