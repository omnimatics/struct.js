'use strict';

module.exports = {
  byte : {
    conv   : String,
    length : 1
  },

  byte2 : {
    conv   : String,
    length : 2
  },

  word2 : {
    conv   : String,
    length : 4
  },

  string : {
    conv   : String,
    length : ''
  },

  string2 : {
    conv   : String,
    length : 'attr.length'
  },

  array : {
    conv   : Array,
    length : ''
  },

  array2 : {
    conv   : Array,
    length : 'attr.length'
  }
};
