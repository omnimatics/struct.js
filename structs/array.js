'use strict';

const _      = require('lodash');
const common = require('../libs/common');
const Struct = require('./');

/**
 * @class Array
 * @extends Struct
 */
class Array extends Struct {
  /**
   * @constructor
   * @param {Array} struct
   */
  constructor(struct, maxLen) {
    super(struct);

    this.maxLen = maxLen;
  }

  parse(buffer, pos, fullBuffer) {
    const self   = this;
    const struct = self.struct;
    const arrRet = [];

    pos = 0;

    let maxLen = buffer.length;

    if (self.maxLen) {
      maxLen = self.maxLen;
    }

    self._parsedLength = 0;

    while (pos < maxLen) {
      const ret = {};

      self._parsedObject = ret;

      _.each(struct, function (s) {
        let key, type, len;

        key  = s[0];
        type = s[1];

        type = _.isFunction(type) ? type() : type;

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
          const parse = type.parse;
          ret[key] = parse ? parse(ret[key]) : ret[key];
        }

        pos += len;
        self._parsedLength = pos;
      });

      arrRet.push(ret);
    }

    return arrRet;
  }
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

module.exports = Array;
