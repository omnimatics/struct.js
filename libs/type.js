'use strict';

function BYTE(n) {
  n = Number(n) || 1;

  return {
    type   : String,
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
    type   : Number,
    length : n
  };
}

function STRING(n) {
  return {
    type   : String,
    length : n || ''
  };
}

function ARRAY(n)  {
  return {
    type   : Array,
    length : n || ''
  };
}

function BUFFER(n) {
  return {
    type   : Buffer,
    length : n || ''
  };
}

const DataTypes = { 
  BYTE   : BYTE,
  WORD   : WORD,
  DWORD  : DWORD,
  NUMBER : NUMBER,
  STRING : STRING,
  ARRAY  : ARRAY,
  BUFFER : BUFFER
};

const ConvTypes = new WeakMap();

ConvTypes.set(Number, function number(n) {
  return parseInt(n, 16);
});
ConvTypes.set(String, String);
ConvTypes.set(Buffer, function buffer(val) {
  return new Buffer(val, 'hex');
});

module.exports = {
  DataTypes : DataTypes,
  ConvTypes : ConvTypes
};
