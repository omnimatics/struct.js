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
   */
  constructor(struct, maxLen) {
    super(struct);

    this.maxLen = maxLen;
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

    let maxLen = buffer.length;

    if (self.maxLen) {
      if (_.isString(self.maxLen) && self.parent) {
        let p;

        do {
          p      = self.parent;
          maxLen = p._parsedObject[self.maxLen];
        } while (!maxLen && self.parent);
      } else {
        maxLen = self.maxLen;
      }
    }

    self._parsedLength = 0;

    while (pos < maxLen) {
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
