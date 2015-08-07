'use strict';

const chai      = require('chai');
const CRCStruct = require('../../structs/crc');
const common    = require('../../libs/common');

chai.should();

describe('CRC', function () {
  let crc, buffer, checkCode;

  before(function () {
    crc       = new CRCStruct(0, -1);
    buffer    = new Buffer('3006017381412006778000301505201225520001ff2da0014a04010002011b0bff0204910c021d4b0d01290bff0204480c021d3d0d012a0bff02042e0c021d3d0d012a0bff0200cf0c02117b0d01290bff0200df0c02117b0d01260bff0203600c02117b0d01260bff0203600c0219cc0d01260bff0203600c0219cc0d01270bff02035e0c0219e60d01270bff02038f0c021a360d01280bff02038f0c021a360d01290bff0202630c021b780d012a0bff0202550c021b780d012b0bff0202470c021b780d012b0bff0202600c021c390d012c0bff0202520c021c390d012c0bff0203fb0c021f220d012d0bff0203e50c021f220d012f0bff0202770c02163e0d012e0bff0202850c02163e0d012d0bff0200d20c02101f0d012c0bff0200dc0c02101f0d012b0bff0202b80c0214ef0d012b0bff0202b80c0214ef0d012b0bff0201a00c0214ef0d012a0bff0201a00c0212e30d012a0bff0201a00c0212e30d0129a1000e00309f16060fda720000019a0017a2000800050219320222db01', 'hex');
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
