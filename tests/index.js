'use strict';

let struct = require('../index');

let Attribute = new struct.Binary([
  { reserve     : 2 },
  { subpackaged : 1 },
  { encrypted   : 3 },
  { length      : 10 }
]);

let CRC = new struct.CRC(0, -1);

let Message = new struct.Struct([
  { id       : 'WORD' },
  { attr     : Attribute },
  { deviceId : 'BYTE[6]' },
  { serialNo : 'WORD' },
  { body     : 'attr.length' },
  { crc      : CRC }
]);

let b  = new Buffer('3000001981412006778000010000000000000000000000000000000000000000000000000039', 'hex');
let b2 = new Buffer('0019', 'hex');

let r = Message.parse(b);
console.log('@r', r);

let s = Message.serialize(r);
console.log('@s', s);

console.log('@s === @b', Buffer.compare(b, s));

let r2 = Attribute.parse(b2);
console.log('@r2', r2);
