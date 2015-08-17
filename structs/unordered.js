'use strict';

const _      = require('lodash');
const common = require('../libs/common');
const Struct = require('./');

/**
 * @class Unordered
 * @extends Struct
 */
class Unordered extends Struct {
  /**
   * @constructor
   * @param {Object} struct 
   * @param {Object} dictionary
   * @param {Function} map 
   */
  constructor(struct, dictionary, map) {
    super(struct);

    this.dictionary = dictionary || {};
    this.map        = map;
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
    const self   = this;
    const struct = self.struct;

    let arrRet = [];

    pos = 0;

    while (pos < buffer.length) {
      const ret = {};

      _.each(struct, function (s) {
        let key, type, len;

        key  = s[0];
        type = s[1];

        type = _.isFunction(type) ? type() : type;

        if (!_validType(type)) {
          throw new Error(`Invalid type: ${type}`);
        }

        if (type instanceof Struct) {
          type.parent = self;

          len      = type.length();
          ret[key] = type.parse(buffer.slice(pos), pos, buffer);

          if (_.isNaN(len)) {
            // use parsed length instead
            len = _.isFunction(type.parsedLength) ? type.parsedLength() : 0;
          }
        } else {
          len      = _typeLength(type, ret, self);
          ret[key] = buffer.toString('hex', pos, pos + len);

          // convert the item to its data type
          const conv = type.conv;
          ret[key] = conv ? conv(ret[key]) : ret[key];
        }

        pos += len;
        self._parsedLength = pos;
      });

      arrRet.push(ret);
    }

    if (_.isFunction(self.map)) {
      let ret = {};

      _.each(arrRet, function (value) {
        self.map(value, self.dictionary, ret);
      })

      arrRet = ret;
    }

    return arrRet;
  }

  /**
   * Converts structured data into raw data.
   *
   * @method serialize
   * @param {Object} json
   */
  serialize(json) {
    const struct = this.struct;

    let hex = '';

    _.each(struct, function (s) {
      let curr, key, type;

      key  = s[0];
      type = s[1];

      type = _.isFunction(type) ? type() : type;

      if (!_validType(type)) {
        throw new Error(`Invalid type: ${type}`);
      }

      if (!_.isPlainObject(type)
          && _.isObject(type)) {
        // pass the current hex value as well
        curr = type.serialize(json[key], hex);
      } else {
        let len = 1;
        let val = json[key];

        // check if val is a buffer,
        // and get its string accordingly
        curr = Buffer.isBuffer(val) ?
          val.toString('hex') : val.toString();

        // get the expected byte length
        // and multiply by 2 to get hex length
        if (_.isNumber(type.length)) {
          len = type.length * 2;
        } else {
          // TODO: figure out what to do
          len = NaN;
        }

        if (_.isNaN(len)) {
          // make the length even
          len = curr.length;
          len = len % 2 === 0 ? len : len + 1;
        }

        curr = common.pad(curr, len);
      }

      // if it's a buffer, convert it to hex first
      hex += Buffer.isBuffer(curr) ? curr.toString('hex') : curr;
    });

    return new Buffer(hex, 'hex');
  }
}

/**
 * Checks if a data type is valid.
 *
 * @function _validType
 * @private
 *
 * @param {Object|number|string} type
 */
function _validType(type) {
  let ret = true;

  if (!_.isObject(type)) {
    ret = false;
  }

  return ret;
}

/**
 * Calculate length by data type or property.
 *
 * @function _typeLength
 * @private
 *
 * @param {Function|number|string} type
 * @param {Object} ref
 * @param {Object} self
 */
function _typeLength(type, ref, self) {
  let ret;

  if (_.isPlainObject(type)) {
    // get type length
    ret = type.length;
  } else if (ref) {
    // get property length
    ret  = _.get(ref, type);

    let parsedLength = self.parsedLength();

    if (!ret) {
      // no property length, look in parent
      while (!ret && self) {
        ret  = _.get(self.parsedObject(), type);
        self = self.parent;
      }

      // subtract the parsed length thus far
      ret -= parsedLength;
    }
  }

  if (_.isString(ret)) {
    // may depend on parent attribute
    ret = _typeLength(ret, ref, self);
  }

  return ret || 0;
}

module.exports = Unordered;
