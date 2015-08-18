'use strict';

const chai    = require('chai');
const common  = require('../../../libs/common');
const fixture = require('../../fixtures/structs/array');

chai.should();

describe('Array', function () {
  let struct, buffer, parse;

  before(function () {
    struct = fixture.struct;
    buffer = fixture.buffer;
    parse  = fixture.parse;
  });

  describe('#parse()', function () {
    it('generates a structured object from a serialized string', function () {
      struct.parse(buffer).should.deep.equal(parse);
    });
  });

  describe('#serialize()', function () {
    it('serializes a JSON into its hex representation', function () {
      struct.serialize(parse).should.deep.equal(buffer);
    });
  });
});
