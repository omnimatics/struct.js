'use strict';

module.exports = {
  byte : {
    parse     : String,
    serialize : String,
    length    : 1
  },

  byte2 : {
    parse     : String,
    serialize : String,
    length    : 2
  },

  word2 : {
    parse     : String,
    serialize : String,
    length    : 4
  },

  number : {
    keys : [ 'parse', 'serialize', 'length' ]
  },

  string : {
    parse     : String,
    serialize : String,
    length    : ''
  },

  string2 : {
    parse     : String,
    serialize : String,
    length    : 'attr.length'
  },

  utf8 : {
    keys : [ 'parse', 'serialize', 'length' ]
  },

  array : {
    parse  : Array,
    length : ''
  },

  array2 : {
    parse  : Array,
    length : 'attr.length'
  }
};
