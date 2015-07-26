'use strict';

const _      = require('lodash');
const common = require('../libs/common');

const TYPES = { 
  BYTE  : { length : 1 },
  WORD  : { length : 2 },
  DWORD : { length : 4 }
};

/**
 * @class Struct
 */
class Struct {
  /**
   * @constructor
   */
  constructor(struct, parent) {
    struct = _.isArray(struct) ? struct : [ struct ];

    this.parent = parent;
    this.struct = struct || [];
  }

  /**
   * @method length
   *
   * Calculate the structure length.
   */
  length() {
    const self = this;

    let struct = self.struct;
    let len    = 0;

    if (_.isArray(struct)) {
      struct = struct.filter(function (s) {
        return _.isPlainObject(s);
      });

      _.each(struct, function (p, c) {
        c = c.bind(self.parent);
        len += c();
      });
    }

    return len;
  }

  /**
   * @method parse
   *
   * Parses the buffer into structured data.
   */
  parse(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Argument must be a buffer');
    }

    const struct = this.struct;

    let pos, ret;

    pos = 0;
    ret = {};

    _.each(struct, function (s) {
      let key, type, len;

      s    = common.objectify(s);
      key  = s.id;
      type = s.val;

      if (!_validType(type)) {
        throw new Error(`Invalid type: ${type}`);
      }

      if (type instanceof Struct) {
        type.parent = ret;

        len      = type.length();
        ret[key] = type.parse(buffer, pos);
      } else {
        len      = _typeLength(type, ret);
        ret[key] = buffer.toString('hex', pos, pos + len);
      }

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
    const struct = this.struct;

    let hex = '';

    _.each(struct, function (s) {
      let key, type;

      s = common.objectify(s);

      key  = s.id;
      type = s.val;

      if (!_validType(type)) {
        throw new Error(`Invalid type: ${type}`);
      }

      if (_.isObject(type)) {
        hex += type.serialize(json[key], hex);
      } else {
        hex += json[key];
      }
    });

    return new Buffer(hex, 'hex');
  }
}

/**
 * @function _validType
 * @private
 *
 * Checks if a data type is valid.
 */
function _validType(type) {
  let ret = true;

  if (!_.isObject(type) && !_.isString(type)) {
    ret = false;
  }

  return ret;
}

/**
 * @function _typeLength
 * @private
 *
 * Calculate length by data type or property.
 */
function _typeLength(type, ref) {
  let rx, len, ret;

  rx   = type.match(/([A-Z]+)\[(\d+)\]/);
  type = rx && rx[1] || type;
  len  = rx && rx[2] || 1;
  len  = Number(len);

  if (TYPES[type]) {
    // get type length
    ret = TYPES[type].length * len;
  } else if (ref) {
    // get property length
    type = type.split('.');

    let key, prop;

    key  = type[0];
    prop = type[1];
    ret  = ref[key] && ref[key][prop];
  }

  return ret || 0;
}

module.exports = Struct;
