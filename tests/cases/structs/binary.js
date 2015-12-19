'use strict'

const chai = require('chai')
const fixtures = require('../../fixtures/common')
const binFixtures = require('../../fixtures/structs/binary')

chai.should()

describe('Binary', () => {
  let binary, buffer, parse

  before(() => {
    binary = fixtures.binary
    buffer = binFixtures.buffer
    parse = binFixtures.parse
  })

  describe('#length()', () => {
    it('returns the byte length of the binary', () => {
      // 16 bits = 2 bytes
      binary.length().should.equal(2)
    })
  })

  describe('#parse()', () => {
    it('calculates the bit values for each binary attribute', () => {
      binary.parse(buffer).should.deep.equal(parse)
    })
  })

  describe('#serialize()', () => {
    it('serializes a JSON into its binary representation', () => {
      const hex = buffer.toString('hex')
      binary.serialize(parse).should.equal(hex)
    })
  })
})
