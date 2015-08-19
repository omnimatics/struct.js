'use strict';

const moment = require('moment');
const common = require('./common');

function BYTE(n) {
  n = Number(n) || 1;

  return {
    parse     : String,
    serialize : String,
    length    : n
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
    parse : function number(val) {
      return parseInt(val, 16);
    },

    serialize : function number(val) {
      return common.pad(val.toString(16), n * 2);
    },

    length : n
  };
}

function STRING(n) {
  return {
    parse     : String,
    serialize : function (val) {
      val = Buffer.isBuffer(val) ? val.toString('hex') : val.toString();

      return val;
    },
    length    : n || ''
  };
}

function UTF8(n) {
  return {
    parse  : function utf8(val) {
      return new Buffer(val, 'hex').toString('utf8');
    },

    serialize : function utf8(val) {
      return common.string2hex(val);
    },

    length : n || ''
  };
}

function BCD(n, format) {
  n      = Number(n) || 1;
  format = format || 'YYMMDDHHmmss';

  return {
    parse  : function BCD(val) {
      return moment(val, format).format();
    },

    serialize : function BCD(val) {
      return moment(val).format('YYMMDDHHmmss');
    },

    length : n
  };
}

function BINARY(n) {
  n = Number(n) || 1;

  return {
    parse  : function (val) {
      val = parseInt(val, 16).toString(2);

      return common.pad(val, n * 8);
    },

    serialize : function (val) {
      val = parseInt(val, 2).toString(16);

      return common.pad(val, n);
    },

    length : n
  }
}

function ARRAY(n)  {
  return {
    parse  : Array,
    length : n || ''
  };
}

function BUFFER(n) {
  return {
    parse  : function buffer(val) {
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
  BCD    : BCD,
  BINARY : BINARY,
  ARRAY  : ARRAY,
  BUFFER : BUFFER
};

module.exports = DataTypes;
