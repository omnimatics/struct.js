'use strict';

const chai   = require('chai');
const common = require('../../../libs/common');

chai.should();

describe('Common', function () {
  describe('#pad()', function () {
    it('pads a number with insufficient zeroes', function () {
      common.pad(12, 4).should.equal('0012');
    });

    it('does not pad a number with sufficient zeroes', function () {
      common.pad(12, 2).should.equal('12');
    });
  });

  describe('#string2hex()', function () {
    it('converts a string to its hexadecimal equivalent', function () {
      common.string2hex('Hello world').should.equal('48656c6c6f20776f726c64');
    });
  });

  describe('#crc()', function () {
    it('calculates the check code if passed an even-digit hexadecimal', function () {
      common.crc('0202').should.equal('00');
    });

    it('calculates the check code if passed a buffer', function () {
      const buffer = new Buffer('0202', 'hex');
      common.crc(buffer).should.equal('00');
    });

    it('throws an error if passed an odd-digit hexadecimal', function () {
      common.crc.bind(common, '202').should.throw(TypeError, 'Invalid hex string');
    });

    it('throws an error if not passed a valid buffer or hexadecimal', function () {
      common.crc.bind(common, 'gh').should.throw(TypeError, 'Invalid buffer or hex string');
    });

    it('throws an error if passed less than 2 bytes', function () {
      common.crc.bind(common, '00').should.throw(RangeError, 'Byte length less than 2');
    });
  });
});
