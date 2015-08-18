'use strict';

const _ = require('lodash');

/** @module libs/common */
module.exports = {
  pad        : pad,
  string2hex : string2hex,
  crc        : crc
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

function string2hex(s) {
  let hex = _.map(s, function (v, k, s) {
    return s.charCodeAt(k).toString(16);
  });

  return hex.join('');
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
