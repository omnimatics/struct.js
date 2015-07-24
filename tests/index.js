'use strict';

let Struct = require('./struct');

let struct = new Struct({
  id        : 'word',
  attribute : 'word',
  deviceId  : 'bcd[6]',
  serialNo  : 'word'
});

let b = new Buffer('3000001981412006778000010000000000000000000000000000000000000000000000000039', 'hex');

let r = struct.parse(b);
console.log('@r', r);

let s = struct.serialize(r);
console.log('@s', s);
