'use strict';

const chai      = require('chai');
const Struct    = require('../../index');
const DataTypes = require('../../libs/type');


chai.should();

describe('Struct', function () {
  let binary, crc, struct, simpleStruct, buffer, expectedParse;

  before(function () {
    binary = new Struct.Binary([
      { reserve     : 2 },
      { subpackaged : 1 },
      { encrypted   : 3 },
      { length      : 10 }
    ]);

    crc = new Struct.CRC(0, -1);

    struct = new Struct.Struct([
      { id       : DataTypes.WORD },
      { attr     : binary },
      { deviceId : DataTypes.BYTE(6) },
      { serialNo : DataTypes.WORD },
      { body     : 'attr.length' },
      { crc      : crc }
    ]);

    simpleStruct = new Struct.Struct([
      { id       : DataTypes.WORD },
      { attr     : binary },
      { deviceId : DataTypes.BYTE(6) },
      { serialNo : DataTypes.WORD },
      { crc      : crc }
    ]);

    buffer = new Buffer('3000001981412006778000010000000000000000000000000000000000000000000000000039', 'hex');

    expectedParse = {
        id   : '3000',
        attr : {
          reserve     : 0,
          subpackaged : 0,
          encrypted   : 0,
          length      : 25
        },
        deviceId : '814120067780',
        serialNo : '0001',
        body     : '00000000000000000000000000000000000000000000000000',
        crc      : '39'
      };
  });

  describe('#length()', function () {
    it('returns NaN when structure is not predictable', function () {
      struct.length().should.deep.equal(NaN);
    });

    it('returns length when structure is predictable', function () {
      simpleStruct.length().should.equal(13);
    });
  });

  describe('#parse()', function () {
    it('generates a structured object from a serialized string', function () {
      struct.parse(buffer).should.deep.equal(expectedParse);
    });
  });

  describe('#serialize()', function () {
    it('serializes a JSON into its hex representation', function () {
      struct.serialize(expectedParse).should.deep.equal(buffer);
    });
  });
});
