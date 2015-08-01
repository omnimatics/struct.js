'use strict';

const _      = require('lodash');
const common = require('../libs/common');
const Struct = require('./');

/**
 * @class Binary
 * @extends Struct
 */
class Binary extends Struct {
  /**
   * @constructor
   * @param {Array} struct
   */
  constructor(struct) {
    super(struct);
  }

  /**
   * Calculates the total byte length.
   *
   * @method length
   */
  length() {
    const totalLen = _totalLength(this.struct);

    // convert bit length to bytes
    return Math.ceil(totalLen / 8);
  }

  /**
   * Parses the buffer to generate structured data.
   *
   * @method parse
   * @param {Buffer} buffer
   * @param {number} pos
   * @param {Buffer} fullBuffer
   */
  parse(buffer, pos, fullBuffer) {
    let totalLen, bin, ret;

    const struct = this.struct;

    pos      = pos || 0;
    totalLen = _totalLength(struct);
    bin      = buffer.toString('hex', 0, this.length());
    ret      = {};

    pos = 0;
    bin = parseInt(bin, 16).toString(2);
    bin = common.pad(bin, totalLen);

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
   * Converts structured data into raw data.
   *
   * @method serialize
   * @param {Object} json
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

      bin += common.pad(val, len);
    });

    hex = parseInt(bin, 2).toString(16);

    // 1 byte = 2 hex numbers,
    // pad accordingly
    return common.pad(hex, this.length() * 2);
  }
}

/**
 * Calculates the total bit length.
 *
 * @function _totalLength
 * @param {Array} struct
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
 * Checks if length is a positive number.
 *
 * @function _validLength
 * @param {number} len
 */
function _validLength(len) {
  let ret = true;

  if (!_.isNumber(len) || len < 0) {
    ret = false;
  }

  return ret;
}

module.exports = Binary;
