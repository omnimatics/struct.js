'use strict';

const chai           = require('chai');
const structFixtures = require('../../fixtures/structs/struct');

chai.should();

describe('Struct', function () {
  let struct, predStruct, simpleStruct, buffer;
  let parse, simpleParse;
  let serializable, simpleSerializable;

  before(function () {
    struct             = structFixtures.struct;
    predStruct         = structFixtures.predStruct;
    simpleStruct       = structFixtures.simpleStruct;
    buffer             = structFixtures.buffer;
    parse              = structFixtures.parse;
    simpleParse        = structFixtures.simpleParse;
    serializable       = structFixtures.serializable;
    simpleSerializable = structFixtures.simpleSerializable;
  });

  describe('#length()', function () {
    it('returns NaN when structure is not predictable', function () {
      struct.length().should.deep.equal(NaN);
    });

    it('returns length when structure is predictable', function () {
      predStruct.length().should.equal(13);
    });
  });

  describe('#parse()', function () {
    it('generates a structured object from a serialized string', function () {
      struct.parse(buffer).should.deep.equal(parse);
      simpleStruct.parse(buffer).should.deep.equal(simpleParse);
    });
  });

  describe('#parsedLength()', function () {
    it('returns length based on bytes parsed', function () {
      struct.parsedLength().should.equal(39);
    });
  });

  describe('#parsedObject()', function () {
    it('returns object based on bytes parsed', function () {
      struct.parsedObject().should.deep.equal(parse);
    });
  });

  describe('#serialize()', function () {
    it('serializes a JSON into its hex representation', function () {
      struct.serialize(serializable).should.deep.equal(buffer);
      simpleStruct.serialize(simpleSerializable).should.deep.equal(buffer);
    });
  });
});
