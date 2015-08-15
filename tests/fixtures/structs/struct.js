'use strict';

const Struct    = require('../../../index');
const DataTypes = require('../../../libs/type').DataTypes;
const fixtures  = require('../common');

const body = new Struct.Struct([
  [ 'province', DataTypes.WORD ],
  [ 'city', DataTypes.WORD ],
  [ 'manufacturer', DataTypes.BYTE(5) ],
  [ 'terminalModel', DataTypes.BYTE(8) ],
  [ 'terminalId', DataTypes.BYTE(7) ],
  [ 'plateColor', DataTypes.BYTE ],
  [ 'plateNumber', DataTypes.STRING('attr.length') ]
]);

module.exports = {
  struct : new Struct.Struct([
    [ 'id', DataTypes.WORD ],
    [ 'attr', fixtures.binary ],
    [ 'deviceId', DataTypes.BYTE(6) ],
    [ 'serialNo', DataTypes.NUMBER(2) ],
    [ 'body', body ],
    [ 'crc', fixtures.crc ]
  ]),

  predStruct : new Struct.Struct([
    [ 'id', DataTypes.WORD ],
    [ 'attr', fixtures.binary ],
    [ 'deviceId', DataTypes.BYTE(6) ],
    [ 'serialNo', DataTypes.WORD ],
    [ 'crc', fixtures.crc ]
  ]),

  simpleStruct : new Struct.Struct([
    [ 'id', DataTypes.WORD ],
    [ 'attr', fixtures.binary ],
    [ 'deviceId', DataTypes.BYTE(6) ],
    [ 'serialNo', DataTypes.WORD ],
    [ 'body', DataTypes.STRING('attr.length') ],
    [ 'crc', fixtures.crc ]
  ]),

  buffer : new Buffer('3000001A8141200677800001000200030000000004000000000000000500000000000006070833', 'hex'),

  parse : {
    id   : '3000',
    attr : {
      reserve     : 0,
      subpackaged : 0,
      encrypted   : 0,
      length      : 26
    },
    deviceId : '814120067780',
    serialNo : 1,
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
  },

  simpleParse : {
    id   : '3000',
    attr : {
      reserve     : 0,
      subpackaged : 0,
      encrypted   : 0,
      length      : 26
    },
    deviceId : '814120067780',
    serialNo : '0001',
    body     : '0002000300000000040000000000000005000000000000060708',
    crc      : '33'
  },

  serializable : {
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
      province      : 2,
      city          : 3,
      manufacturer  : 4,
      terminalModel : 5,
      terminalId    : 6,
      plateColor    : 7,
      plateNumber   : 8
    },
    crc      : '33'
  },

  simpleSerializable : {
    id   : '3000',
    attr : {
      reserve     : 0,
      subpackaged : 0,
      encrypted   : 0,
      length      : 26
    },
    deviceId : '814120067780',
    serialNo : '0001',
    body     : new Buffer('0002000300000000040000000000000005000000000000060708', 'hex'),
    crc      : '33'
  }
};
