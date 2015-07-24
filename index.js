'use strict';

const _ = require('lodash');

const TYPES = { 
  byte     : 1,
  word     : 2,
  dword    : 4,
  'bcd[6]' : 6
};

class Struct {
  constructor(struct) {
    if (!struct) {
      throw new Error('Definition is required');
    }

    if (!_.isPlainObject(struct)) {
      throw new Error('Definition must be an object');
    }

    this.struct = struct;
  }

  parse(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Argument must be a buffer');
    }

    let struct = this.struct;
    let pos    = 0;
    let ret    = {};

    _.each(struct, function (type, key) {
      let len, val;

      if (!_validType(type)) {
        throw new Error('Invalid type: %s', type);
      }

      if (_.isObject(type)) {
      } else {
        len      = TYPES[type];
        ret[key] = buffer.toString('hex', pos, pos + len);
      }

      pos += len;
    });

    return ret;
  }

  // serialize a JSON object
  serialize(json) {
    let struct = this.struct;
    let hex    = '';

    _.each(struct, function (type, key) {
      if (!_validType(type)) {
        throw new Error('Invalid type: %s', type);
      }

      if (_.isObject(type)) {
      } else {
        hex += json[key];
      }
    });

    return new Buffer(hex, 'hex');
  }
}

function _validType(type) {
  if (
    !_.isPlainObject(type) &&
    !TYPES[type]
  ) {
    return false;
  }

  return true;
}

module.exports = Struct;
