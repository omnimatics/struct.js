'use strict';

const chai        = require('chai');
const common      = require('../../../libs/common');
const fixtures    = require('../../fixtures/common');
const crcFixtures = require('../../fixtures/structs/crc');

chai.should();

describe('CRC', function () {
  let crc, buffer, checkCode;

  before(function () {
    crc       = fixtures.crc;
    buffer    = crcFixtures.buffer;
    checkCode = buffer[buffer.length - 1].toString(16);
    checkCode = common.pad(checkCode, 2);
  });

  describe('#length()', function () {
    it('returns 1', function () {
      crc.length().should.equal(1);
    });
  });

  describe('#parse()', function () {
    it('the check code equals the last entry in the buffer', function () {
      const p = crc.parse(buffer);

      p.should.equal(checkCode);
    });
  });

  describe('#serialize()', function () {
    it('calculates the check code', function () {
      const hex = buffer.slice(0, -1).toString('hex');

      crc.serialize(null, hex).should.equal(checkCode);
    });
  });
});
