'use strict';

const _         = require('lodash');
const chai      = require('chai');
const Struct    = require('../../../index');
const fixture   = require('../../fixtures/structs/unordered');
const DataTypes = require('../../../libs/type');

chai.should();

describe('Unordered', function () {
  let struct, buffer, parse;

  before(function () {
    struct = new Struct.Unordered([
      [ 'id', DataTypes.WORD ],
      [ 'length', DataTypes.NUMBER ],
      [ 'value', DataTypes.STRING('length') ]
    ],
    fixture.dictionary,
    function (value, dictionary, obj) {
      const item = dictionary[value.id];

      if (item) {
        let type = item.type;

        type = _.isFunction(type) ? type() : type;

        obj[item.name] = type.conv(value.value);
      }
    });

    buffer = fixture.buffer;
    parse  = fixture.parse;
  });

  describe('#length()', function () {
    it('returns NaN when structure is not predictable', function () {
      struct.length().should.deep.equal(NaN);
    });
  });

  describe('#parse()', function () {
    it('parses a buffer in accordance with a dictionary', function () {
      struct.parse(buffer).should.deep.equal(parse);
    });
  });

  describe('#parsedLength()', function () {
    it('returns length based on bytes parsed', function () {
      struct.parsedLength().should.equal(251);
    });
  });

  describe('#serialize()', function () {
    it('calculates the bit values for each binary attribute', function () {
      struct.serialize(parse).should.deep.equal(buffer);
    });
  });
});
