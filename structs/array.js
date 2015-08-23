'use strict';

const _      = require('lodash');
const Struct = require('./');

/**
 * @class Array
 * @extends Struct
 */
class Array extends Struct {
  /**
   * @constructor
   * @param {Array} struct
   * @param {number|string} maxLength
   * @param {number|string} multiplier
   */
  constructor(struct, maxLength, multiplier) {
    super(struct);

    this.maxLength  = maxLength;
    this.multiplier = Number(multiplier) || 1;
  }

  /**
   * Parses the buffer into structured data.
   *
   * @method parse
   * @param {Buffer} buffer
   * @param {number} pos
   * @param {Buffer} fullBuffer
   */
  parse(buffer, pos, fullBuffer) {
    const self   = this;
    const struct = self.struct;
    const arrRet = [];

    pos = 0;

    let maxLength = buffer.length;

    if (self.maxLength) {
      if (_.isString(self.maxLength) && self.parent) {
        let p = self;

        do {
          p         = p.parent;
          maxLength = _.get(p._parsedObject, self.maxLength);
        } while (!maxLength && p.parent);
      } else {
        maxLength = self.maxLength;
      }
    }

    // apply multiplier
    maxLength *= self.multiplier;

    self._parsedLength = 0;

    while (pos < maxLength) {
      const ret = {};

      self._parsedObject = ret;
      pos = self._parseStruct(buffer, pos, ret);

      arrRet.push(ret);
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

    json = _.isArray(json) ? json : [ json ];

    const hex = _.map(json, function (o) {
      const curr = _.map(struct, function (s) {
        let ret, key, type;

        key  = s[0];
        type = s[1];

        type = _.isFunction(type) ? type() : type;
        ret  = type.serialize(o[key]);

        if (Buffer.isBuffer(ret)) {
          ret = ret.toString('hex');
        }

        return ret;
      });

      return curr.join('');
    });

    return new Buffer(hex.join(''), 'hex');
  }
}

module.exports = Array;
