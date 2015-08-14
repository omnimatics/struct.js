'use strict';

const _      = require('lodash');
const common = require('../libs/common');

/**
 * @class Struct
 */
class Struct {
  /**
   * @constructor
   * @param {Array} struct
   * @param {Object} parent
   */
  constructor(struct, parent) {
    struct = _.isArray(struct) ? struct : [ struct ];

    this.parent = parent;
    this.struct = struct || [];

    this._parsedLength = 0;
    this._parsedObject = {};
  }

  /**
   * Calculates the structure length.
   *
   * @method length
   */
  length() {
    const self = this;

    let struct = self.struct;
    let len    = 0;

    if (_.isArray(struct)) {
      function _parseVal(v) {
        let ret = 0;

        if (_.isNumber(v)) {
          ret = v;
        } else if (_.isString(v)) {
          ret = NaN;
        } else if (_.isFunction(v.length)) {
          ret = v.length();
        } else {
          ret = _parseVal(v());
        }

        return ret;
      }

      struct = struct.filter(function (s) {
        return _.isArray(s);
      });

      len = _.reduce(struct, function (p, c) {
        let pVal, cVal;

        p = _.isNumber(p) ? p : p[1];
        c = c[1];

        pVal = _parseVal(p);
        cVal = _parseVal(c);

        return pVal + cVal;
      });
    }

    return len;
  }

  /**
   * Total buffer count parsed thus far in the
   * current run.
   *
   * If struct contains a parent, will include
   * parent's buffer count as well.
   *
   * @method parsedLength
   */
  parsedLength() {
    return this._parsedLength;
  }

  /**
   * Total objects parsed thus far in the
   * current run.
   *
   * @method parsedObject
   */
  parsedObject() {
    return this._parsedObject;
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
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Argument must be a buffer');
    }

    const self   = this;
    const struct = self.struct;

    let ret;

    pos = 0;
    ret = {};

    self._parsedLength = 0;
    self._parsedObject = ret;

    _.each(struct, function (s) {
      let key, type, len;

      key  = s[0];
      type = s[1];

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
      }

      pos += len;
      self._parsedLength = pos;
    });

    return ret;
  }

  /**
   * Converts structured data into raw data.
   *
   * @method serialize
   * @param {Object} obj
  */
  serialize(obj) {
    const struct = this.struct;

    let hex = '';

    _.each(struct, function (s) {
      let curr, key, type;

      key  = s[0];
      type = s[1];

      if (!_validType(type)) {
        throw new Error(`Invalid type: ${type}`);
      }

      if (!_.isFunction(type) && _.isObject(type)) {
        // pass the current hex value as well
        curr = type.serialize(obj[key], hex);
      } else {
        let len = 1;

        curr = obj[key].toString();

        // get the expected byte length
        // and multiply by 2 to get hex length
        if (_.isFunction(type)) {
          len = type() * 2;
        } else if (_.isNumber(type)) {
          len = type * 2;
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

  if (
    !_.isObject(type)
    && !_.isNumber(type)
    && !_.isString(type)
  ) {
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

  if (_.isFunction(type) || _.isNumber(type)) {
    // get type length
    ret = _.isFunction(type) ? type() : type;
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

module.exports = Struct;
