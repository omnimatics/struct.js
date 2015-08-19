'use strict';

const chai    = require('chai');
const common  = require('../../../libs/common');
const fixture = require('../../fixtures/structs/array');

chai.should();

describe('Array', function () {
  let s1, p1, b1, b2, s2, p2;

  before(function () {
    s1 = fixture.s1;
    b1 = fixture.b1;
    p1 = fixture.p1;

    s2 = fixture.s2;
    b2 = fixture.b2;
    p2 = fixture.p2;
  });

  describe('#length()', function () {
    it('returns NaN when structure is not predictable', function () {
      s1.length().should.deep.equal(NaN);
      s2.length().should.deep.equal(NaN);
    });
  });

  describe('#parse()', function () {
    it('generates a structured object from a serialized string', function () {
      s1.parse(b1).should.deep.equal(p1);
      s2.parse(b2).should.deep.equal(p2);
    });
  });

  describe('#parsedLength()', function () {
    it('returns length based on bytes parsed', function () {
      s1.parsedLength().should.equal(12);
      s2.parsedLength().should.equal(361);
    });
  });

  describe('#serialize()', function () {
    it('serializes a JSON into its hex representation', function () {
      s1.serialize(p1).should.deep.equal(b1);
      s2.serialize(p2).should.deep.equal(b2);
    });
  });
});
