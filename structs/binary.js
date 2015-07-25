'use strict';

const _      = require('lodash');
const common = require('../libs/common');
const Struct = require('./');

class Binary extends Struct {
  /**
   * @constructor
   */
  constructor(struct) {
    super(struct);
  }

  /**
   * @method length
   *
   * Calculates the total byte length.
   */
  length() {
    const totalLen = _totalLength(this.struct);

    // convert bit length to bytes
    return Math.ceil(totalLen / 8);
  }

  /**
   * @method parse
   *
   * Parses the buffer to generate structured data.
   */
  parse(buffer, pos) {
    let totalLen, bin, ret;

    const struct = this.struct;

    pos      = pos || 0;
    totalLen = _totalLength(struct);
    bin      = buffer.toString('hex', pos, pos + this.length());
    ret      = {};

    pos = 0;
    bin = parseInt(bin, 16).toString(2);
    bin = _.padLeft(bin, totalLen, '0');

    _.each(struct, function (s) {
      let key, len;

      s = common.objectify(s);

      key = s.id;
      len = s.val;

      if (!_validLength(len)) {
        throw new Error(`Invalid length, please specify a number. Got : ${key} => ${len}`);
      }

      ret[key] = bin.substring(pos, pos + len);
      ret[key] = parseInt(ret[key], 2);

      pos += len;
    });

    return ret;
  }

  /**
   * @method serialize
   *
   * Converts structured data into raw data.
   */
  serialize(json) {
    let bin, hex;

    bin = '';
    hex = '';

    _.each(this.struct, function (s) {
      let key, len, val;

      s = common.objectify(s);

      key = s.id;
      len = s.val;
      val = Number(json[key]).toString(2);

      bin += _.padLeft(val, len, '0');
    });

    hex = parseInt(bin, 2).toString(16);

    // 1 byte = 2 hex numbers,
    // pad accordingly
    return _.padLeft(hex, this.length() * 2, '0');
  }
}

/**
 * @name _totalLength
 *
 * Calculates the total bit length.
 */
function _totalLength(struct) {
  const lens = _.map(struct, function (s) {
    return _.values(s)[0];
  });

  return _.reduce(lens, function (prev, curr) {
    return prev + curr;
  });
}

/**
 * @name _validLength
 *
 * Checks if length is a positive number.
 */
function _validLength(len) {
  let ret = true;

  if (!_.isNumber(len) || len < 0) {
    ret = false;
  }

  return ret;
}

module.exports = Binary;
