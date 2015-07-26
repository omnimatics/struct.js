'use strict';

const _ = require('lodash');

/** @module libs/common */
module.exports = {
  pad       : pad,
  objectify : objectify,
  crc       : crc
};

/**
 * Convenience function for lodash's padLeft().
 *
 * @function pad
 * @param {string} s
 * @param {number} width
 * @param {string} z
 */
function pad(s, width, z) {
  z = z || '0';

  return _.padLeft(s, width, z);
}

/**
 * @function objectify
 */
function objectify(o) {
  let keys   = _.keys(o);
  let values = _.values(o);

  return {
    id  : keys[0],
    val : values[0]
  };
}

/**
 * Calculates the check code for a given buffer.
 *
 * @function crc
 */
function crc(buffer) {
  buffer = Buffer.isBuffer(buffer) ? buffer : new Buffer(buffer, 'hex');

  // XOR byte with the next until end.
  let checkCode = _.reduce(buffer, function (prev, curr) {
    return prev ^ curr;
  });

  // pad the number to 2 significant digits
  return pad(checkCode.toString(16), 2);
}
