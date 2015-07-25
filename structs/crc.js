'use strict';

const _      = require('lodash');
const common = require('../libs/common');
const Struct = require('./');

class CRC extends Struct {
  /**
   * @constructor
   */
  constructor(start, end) {
    super();

    this.start = Number(start);
    this.end   = Number(end);
  }

  /**
   * @method length
   *
   * Gets the CRC length.
   */
  length() {
    return 1;
  }

  /**
   * @method parse
   *
   * Parses the buffer into structured data.
   */
  parse(oBuffer) {
    let start, end, buffer, crc, expectedCrc;

    start = this.start;
    end   = this.end;

    buffer      = oBuffer.slice(start, end);
    expectedCrc = oBuffer[end >= 0 ? end : oBuffer.length + end];
    expectedCrc = expectedCrc && expectedCrc.toString(16) || '00';

    crc = common.crc(buffer);

    if (expectedCrc !== crc) {
      throw new Error(`Invalid CRC code. Actual: 0x${crc.toString(16)}, expected: 0x${expectedCrc.toString(16)}`);
    }

    // pad the number to 2 significant digits
    return crc;
  }

  /**
   * @method serialize
   *
   * Converts structured data into raw data.
   */
  serialize(value, hex) {
    return common.crc(hex);
  }
}

module.exports = CRC;
