'use strict';

const chai   = require('chai');
const common = require('../../libs/common');

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

  describe('#objectify()', function () {
    it('breaks an object into an id-value object', function () {
      common.objectify({ id : 'val' }).should.deep.equal({
        id  : 'id',
        val : 'val'
      });
    });

    it('throws an error when a plain object is not passed', function () {
      common.objectify.should.throw('Must be plain object');
      common.objectify.bind(common, []).should.throw(Error, 'Must be plain object');
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
