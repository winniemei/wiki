DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS category;

CREATE TABLE article(
  id SERIAL PRIMARY KEY, 
  title VARCHAR(255),
  time_edited VARCHAR(255),
  img_url VARCHAR(255),
  article_text TEXT,
  author_id INTEGER references author,
  category_id INTEGER references category
);

CREATE TABLE author(
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255),
  email VARCHAR(255),
  location VARCHAR(255)
);

CREATE TABLE category(
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255)
);

