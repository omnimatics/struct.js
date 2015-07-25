'use strict';

const _ = require('lodash');

module.exports = {
  objectify : objectify,
  crc       : crc
};

/**
 * @name objectify
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
 * @name crc
 *
 * Calculates the check code for a given buffer
 */
function crc(buffer) {
  buffer = Buffer.isBuffer(buffer) ? buffer : new Buffer(buffer, 'hex');

  // XOR byte with the next until end.
  let checkCode = _.reduce(buffer, function (prev, curr) {
    return prev ^ curr;
  });

  // pad the number to 2 significant digits
  return _.padLeft(checkCode.toString(16), 2, '0');
}
