'use strict';

let struct = require('../index');

let Attribute = new struct.BinaryStruct([
  { length      : 10 },
  { encrypted   : 3 },
  { subpackaged : 1 },
  { reserve     : 2 },
]);

let Message = new struct.Struct([
  { id       : 'word' },
  { attr     : Attribute },
  { deviceId : 'bcd[6]' },
  { serialNo : 'word' },
  { body     : function () {
    return this.attr.length;
  } },
  { checkCode :  }
]);

let b = new Buffer('3000001981412006778000010000000000000000000000000000000000000000000000000039', 'hex');
let b2 = new Buffer('0019', 'hex');

let r = Message.parse(b);
console.log('@r', r);

let s = Message.serialize(r);
console.log('@s', s);

let r2 = Attribute.parse(b2);
console.log('@r2', r2);
