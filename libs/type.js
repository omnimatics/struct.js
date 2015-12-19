'use strict'

const moment = require('moment')
const common = require('./common')

function BYTE(length) {
  return {
    parse: String,
    serialize: String,
    length: Number(length) || 1
  }
}

function WORD(n) {
  n = Number(n) || 1

  return BYTE(n * 2)
}

function DWORD() {
  return WORD(2)
}

function NUMBER(length) {
  length = Number(length) || 1

  return {
    parse: (val) => parseInt(val, 16),
    serialize: (val) => common.pad(val.toString(16), length * 2),
    length
  }
}

function STRING(length) {
  return {
    parse: String,
    serialize: (val) => {
      const type = Buffer.isBuffer(val) ? 'hex' : undefined
      return val.toString(type)
    },
    length: length || ''
  }
}

function UTF8(length) {
  return {
    parse: (val) => new Buffer(val, 'hex').toString('utf8'),
    serialize: (val) => common.string2hex(val),
    length: length || ''
  }
}

function BCD(length, format) {
  length = Number(length) || 1
  format = format || 'YYMMDDHHmmss'

  return {
    parse: (val) => moment(val, format).format(),
    serialize: (val) => moment(val).format('YYMMDDHHmmss'),
    length
  }
}

function BINARY(length) {
  length = Number(length) || 1

  return {
    parse: (val) => {
      val = parseInt(val, 16).toString(2)
      return common.pad(val, length * 8)
    },

    serialize: (val) => {
      val = parseInt(val, 2).toString(16)
      return common.pad(val, length)
    },

    length
  }
}

function ARRAY(length)  {
  return {
    parse: Array,
    length: length || ''
  }
}

function BUFFER(length) {
  return {
    parse: (val) => new Buffer(val, 'hex'),
    length: length || ''
  }
}

const DataTypes = {
  BYTE, WORD, DWORD,
  NUMBER, STRING, UTF8,
  BCD, BINARY, ARRAY,
  BUFFER
}

module.exports = DataTypes
