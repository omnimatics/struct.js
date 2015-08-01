'use strict';

const chai      = require('chai');
const Struct    = require('../../index');
const DataTypes = require('../../libs/type');


chai.should();

describe('Struct', function () {
  let binary, body, crc, struct, simpleStruct, buffer, expectedParse;

  before(function () {
    binary = new Struct.Binary([
      { reserve     : 2 },
      { subpackaged : 1 },
      { encrypted   : 3 },
      { length      : 10 }
    ]);

    body = new Struct.Struct([
      { province      : DataTypes.WORD },
      { city          : DataTypes.WORD },
      { manufacturer  : DataTypes.BYTE(5) },
      { terminalModel : DataTypes.BYTE(8) },
      { terminalId    : DataTypes.BYTE(7) },
      { plateColor    : DataTypes.BYTE },
      { plateNumber   : DataTypes.STRING('attr.length') }
    ]);

    crc = new Struct.CRC(0, -1);

    struct = new Struct.Struct([
      { id       : DataTypes.WORD },
      { attr     : binary },
      { deviceId : DataTypes.BYTE(6) },
      { serialNo : DataTypes.WORD },
      { body     : body },
      { crc      : crc }
    ]);

    simpleStruct = new Struct.Struct([
      { id       : DataTypes.WORD },
      { attr     : binary },
      { deviceId : DataTypes.BYTE(6) },
      { serialNo : DataTypes.WORD },
      { crc      : crc }
    ]);

    buffer = new Buffer('3000001A8141200677800001000200030000000004000000000000000500000000000006070833', 'hex');

    expectedParse = {
        id   : '3000',
        attr : {
          reserve     : 0,
          subpackaged : 0,
          encrypted   : 0,
          length      : 26
        },
        deviceId : '814120067780',
        serialNo : '0001',
        body     : {
          province      : '0002',
          city          : '0003',
          manufacturer  : '0000000004',
          terminalModel : '0000000000000005',
          terminalId    : '00000000000006',
          plateColor    : '07',
          plateNumber   : '08'
        },
        crc      : '33'
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

  describe('#parsedLength()', function () {
    it('returns length based on bytes parsed', function () {
      struct.parsedLength().should.equal(39);
    });
  });

  describe('#parsedObject()', function () {
    it('returns object based on bytes parsed', function () {
      struct.parsedObject().should.deep.equal(expectedParse);
    });
  });

  describe('#serialize()', function () {
    it('serializes a JSON into its hex representation', function () {
      struct.serialize(expectedParse).should.deep.equal(buffer);
    });
  });
});
