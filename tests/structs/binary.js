'use strict';

const chai         = require('chai');
const BinaryStruct = require('../../structs/binary');

chai.should();

describe('Binary', function () {
  let binary, byteLength, buffer, expectedParse;

  before(function () {
    binary = new BinaryStruct([
      { reserve     : 2 },
      { subpackaged : 1 },
      { encrypted   : 3 },
      { length      : 10 }
    ]);

    // 16 bits = 2 bytes;
    byteLength = 2;

    buffer = new Buffer('0019', 'hex');

    expectedParse = {
      reserve     : 0,
      subpackaged : 0,
      encrypted   : 0,
      length      : 25
    };
  });

  describe('#length()', function () {
    it('returns the byte length of the binary', function () {
      binary.length().should.equal(byteLength);
    });
  });

  describe('#parse()', function () {
    it('calculates the bit values for each binary attribute', function () {
      binary.parse(buffer).should.deep.equal(expectedParse);
    });
  });

  describe('#serialize()', function () {
    it('serializes a JSON into its binary representation', function () {
      const hex = buffer.toString('hex');

      binary.serialize(expectedParse).should.equal(hex);
    });
  });
});
