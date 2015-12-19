'use strict'

module.exports = {
  keys: [ 'parse', 'serialize', 'length' ],

  byte: {
    parse: String,
    serialize: String,
    length: 1
  },

  byte2: {
    parse: String,
    serialize: String,
    length: 2
  },

  word2: {
    parse: String,
    serialize: String,
    length: 4
  },

  array: {
    parse: Array,
    length: ''
  },

  array2: {
    parse: Array,
    length: 'attr.length'
  }
}
