'use strict'

const chai = require('chai')
const common = require('../../../libs/common')
const fixtures = require('../../fixtures/common')
const crcFixtures = require('../../fixtures/structs/crc')

chai.should()

describe('CRC', () => {
  let crc, buffer, checkCode

  before(() => {
    crc = fixtures.crc
    buffer = crcFixtures.buffer
    checkCode = buffer[buffer.length - 1].toString(16)
    checkCode = common.pad(checkCode, 2)
  })

  describe('#length()', () => {
    it('returns 1', () => {
      crc.length().should.equal(1)
    })
  })

  describe('#parse()', () => {
    it('the check code equals the last entry in the buffer', () => {
      crc.parse(buffer).should.equal(checkCode)
    })
  })

  describe('#serialize()', () => {
    it('calculates the check code', () => {
      const hex = buffer.slice(0, -1).toString('hex')
      crc.serialize(null, hex).should.equal(checkCode)
    })
  })
})
