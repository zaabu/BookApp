/* eslint-disable linebreak-style */
const books = require('./books/books.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(books);
  app.configure(users);
};
