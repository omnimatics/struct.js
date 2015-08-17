'use strict';

function BYTE(n) {
  n = Number(n) || 1;

  return {
    conv   : String,
    length : n
  };
}

function WORD(n) {
  n = Number(n) || 1;

  return BYTE(n * 2);
}

function DWORD() {
  return WORD(2);
}

function NUMBER(n) {
  n = Number(n) || 1;

  return {
    conv   : function number(val) {
      return parseInt(val, 16);
    },

    length : n
  };
}

function STRING(n) {
  return {
    conv   : String,
    length : n || ''
  };
}

function UTF8(n) {
  return {
    conv   : function utf8(val) {
      return new Buffer(val, 'hex').toString('utf8');
    },

    length : n || ''
  };
}

function ARRAY(n)  {
  return {
    conv   : Array,
    length : n || ''
  };
}

function BUFFER(n) {
  return {
    conv   : function buffer(val) {
      return new Buffer(val, 'hex');
    },

    length : n || ''
  };
}

const DataTypes = { 
  BYTE   : BYTE,
  WORD   : WORD,
  DWORD  : DWORD,
  NUMBER : NUMBER,
  STRING : STRING,
  UTF8   : UTF8,
  ARRAY  : ARRAY,
  BUFFER : BUFFER
};

module.exports = DataTypes;
