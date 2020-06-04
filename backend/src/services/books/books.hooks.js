/* eslint-disable linebreak-style */
const { authenticate } = require('@feathersjs/authentication').hooks;

const processBook = require('../../hooks/process-book');

const populateUser = require('../../hooks/populate-user');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [processBook()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [populateUser()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
