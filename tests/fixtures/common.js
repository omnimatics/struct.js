'use strict'

const Struct = require('../../index')

module.exports = {
  binary: new Struct.Binary([
    [ 'reserve', 2 ],
    [ 'subpackaged', 1 ],
    [ 'encrypted', 3 ],
    [ 'length', 10 ]
  ]),

  crc: new Struct.CRC(0, -1)
}
