'use strict';

/**
 * @module index
 */
module.exports = {
  Struct    : require('./structs'),
  Binary    : require('./structs/binary'),
  CRC       : require('./structs/crc'),
  Unordered : require('./structs/unordered'),
  DataTypes : require('./libs/type')
};
