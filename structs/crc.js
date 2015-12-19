'use strict'

const _ = require('lodash')
const common = require('../libs/common')
const Struct = require('./')

/**
 * @class CRC
 * @extends Struct
 */
class CRC extends Struct {
  /**
   * @constructor
   */
  constructor(start, end) {
    super()

    this.start = Number(start)
    this.end = Number(end)
  }

  /**
   * Gets the CRC length.
   *
   * @method length
   */
  length() {
    return 1
  }

  /**
   * Parses the buffer into structured data.
   *
   * @method parse
   * @param {Buffer} oBuffer
   * @param {number} pos
   * @param {Buffer} fullBuffer
   */
  parse(oBuffer, pos, fullBuffer) {
    let start, end, buffer, crc, expectedCrc

    fullBuffer = fullBuffer || oBuffer

    start = this.start
    end = this.end

    buffer = fullBuffer.slice(start, end)
    expectedCrc = fullBuffer[end >= 0 ? end : fullBuffer.length + end]
    expectedCrc = expectedCrc && expectedCrc.toString(16) || '00'
    expectedCrc = common.pad(expectedCrc, 2)

    crc = common.crc(buffer)

    if (expectedCrc !== crc) {
      throw new Error(`Invalid CRC code. Actual: 0x${crc.toString(16)}, expected: 0x${expectedCrc.toString(16)}`)
    }

    return crc
  }

  /**
   * Converts structured data into raw data.
   *
   * @method serialize
   * @param {string} value
   * @param {string} hex
   */
  serialize(value, hex) {
    return common.crc(hex)
  }
}

module.exports = CRC
