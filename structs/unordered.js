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
    this.map        = map        || {};
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
      pos = this._parseStruct(buffer, pos, ret);

      arrRet.push(ret);
    }

    if (_.isFunction(self.map.parse)) {
      let ret = {};

      _.each(arrRet, function (value) {
        self.map.parse(value, self.dictionary, ret);
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
    const struct     = this.struct;
    const dictionary = this.dictionary;
    const map        = this.map;

    let compile = [];

    if (_.isFunction(map.serialize)) {
      compile = map.serialize(json, dictionary);
    }

    const hex = _.map(compile, function (i) {
      const curr = _.map(struct, function (s) {
        let ret, key, type;

        key  = s[0];
        type = s[1];

        type = _.isFunction(type) ? type() : type;
        ret  = type.serialize(i[key]);

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

module.exports = Unordered;
