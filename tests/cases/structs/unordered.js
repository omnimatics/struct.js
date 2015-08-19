'use strict';

const chai    = require('chai');
const fixture = require('../../fixtures/structs/unordered');

chai.should();

describe('Unordered', function () {
  let struct, buffer, parse;

  before(function () {
    struct = fixture.struct;
    buffer = fixture.buffer;
    parse  = fixture.parse;
  });

  describe('#length()', function () {
    it('returns NaN when structure is not predictable', function () {
      struct.length().should.deep.equal(NaN);
    });
  });

  describe('#parse()', function () {
    it('parses a buffer based on a dictionary', function () {
      struct.parse(buffer).should.deep.equal(parse);
    });
  });

  describe('#parsedLength()', function () {
    it('returns length based on bytes parsed', function () {
      struct.parsedLength().should.equal(251);
    });
  });

  describe('#serialize()', function () {
    it('serializes data based on a dictionary', function () {
      struct.serialize(parse).should.deep.equal(buffer);

      let bs = struct.serialize(parse).toString('hex');
      let bb = buffer.toString('hex');

      bs.should.equal(bb);
    });
  });
});
