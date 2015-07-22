var db = require('./db.js');


var author = ['Winnie Mei', 'Taylor Swift']
var titles = ['Raines Law Room', 'Angels Share']

var image = [
  'http://nightlifeinnewyorkcity.com/wp-content/gallery/raines-law-room-william/raines-law-room-william-inside.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyG2LmXgijkT5PSvfdhnbmFWkP_CSNC7i57Z7hG9trqSSFpe1DrA'
]

var articletext = ['It is hard to find, it is a little black door that you ring the doorbell and a man answers the door and lets you in. Upon entering it looks like a very dimly lit library with velvet couches and leather chairs. If you proceed to the back where the bar is it is a little kitchen where the bartenders work right in front of you. The drinks are AMAZING! I dont really like gin, but they dont serve vodka. I got an aviation (egg whites, gin, lemon), bees knees (gin, honey, lemon) and a gordons cup (gin, cucumber juice, salt and pepper) - sounds gross, but they were fantastic. Bees knees were my favorite. It is a great place to bring a date, before dinner and get a couple of cocktail', 'My favorite bar in New York City by far. They make very yummy sophisticated drinks. The ambiance is very unique and pleasant. My white truffle drink was FANTASTIC.']

var time = ['7.21.2015', '7.21.2015']

var categories = ['Bars', 'Clubs']
var emails = ['winniemei@gmail.com', 'taylorswift@gmail.com']
var locations = ['Manhattan', 'Brooklyn']


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

