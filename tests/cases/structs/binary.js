'use strict';

const chai        = require('chai');
const fixtures    = require('../../fixtures/common');
const binFixtures = require('../../fixtures/structs/binary');

chai.should();

describe('Binary', function () {
  let binary, buffer, parse;

  before(function () {
    binary = fixtures.binary;
    buffer = binFixtures.buffer;
    parse  = binFixtures.parse;
  });

  describe('#length()', function () {
    it('returns the byte length of the binary', function () {
      // 16 bits = 2 bytes;
      binary.length().should.equal(2);
    });
  });

  describe('#parse()', function () {
    it('calculates the bit values for each binary attribute', function () {
      binary.parse(buffer).should.deep.equal(parse);
    });
  });

  describe('#serialize()', function () {
    it('serializes a JSON into its binary representation', function () {
      const hex = buffer.toString('hex');

      binary.serialize(parse).should.equal(hex);
    });
  });
});
