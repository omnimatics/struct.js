'use strict';

const _      = require('lodash');
const common = require('../libs/common');

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

    if (!_.isArray(struct)) {
      throw new Error('Definition must be an array');
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

    _.each(struct, function (s) {
      let key, type, len;

      s = common.objectify(s);

      key  = s.id;
      type = s.val;

      if (!_validType(type)) {
        throw new Error(`Invalid type: ${type}`);
      }

      if (_.isObject(type) && !_.isFunction(type)) {
        len      = type.length();
        ret[key] = type.parse(buffer.slice(pos, pos + len));
      } else if (_.isFunction(type)) {
        type = type.bind(ret);

        len      = type();
        ret[key] = buffer.toString('hex', pos, pos + len);
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

    _.each(struct, function (s) {
      let key, type;

      s = common.objectify(s);

      key  = s.id;
      type = s.val;

      if (!_validType(type)) {
        throw new Error(`Invalid type: ${type}`);
      }

      if (_.isObject(type)) {
        // TODO
      } else {
        hex += json[key];
      }
    });

    return new Buffer(hex, 'hex');
  }
}

function _validType(type) {
  let ret = true;

  if (
    !_.isObject(type) &&
    !TYPES[type]
  ) {
    ret = false;
  }

  return ret;
}

module.exports = Struct;
