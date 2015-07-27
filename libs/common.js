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
 * Breaks an object into an id-value object.
 *
 * @function objectify
 * @param {Object} o
 */
function objectify(o) {
  if (!_.isPlainObject(o)) {
    throw new Error('Must be plain object');
  }

  let id, val;

  id  = _.keys(o);
  val = _.values(o);

  return {
    id  : id[0],
    val : val[0]
  };
}

/**
 * Calculates the check code for a given buffer.
 *
 * @function crc
 */
function crc(buffer) {
  const isBuffer = Buffer.isBuffer(buffer);
  const isHex    = /^[0-9a-fA-F]+$/.test(buffer);

  // not buffer or hex, so throw
  if (!isBuffer && !isHex) {
    throw new TypeError('Invalid buffer or hex string');
  }

  buffer = isBuffer ? buffer : new Buffer(buffer, 'hex');

  if (buffer.length < 2) {
    throw new RangeError('Byte length less than 2');
  }

  // XOR byte with the next until end.
  let checkCode = _.reduce(buffer, function (prev, curr) {
    return prev ^ curr;
  });

  // pad the number to 2 significant digits
  return pad(checkCode.toString(16), 2);
}
