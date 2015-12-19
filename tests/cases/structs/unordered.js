'use strict'

const chai = require('chai')
const fixture = require('../../fixtures/structs/unordered')

chai.should()

describe('Unordered', () => {
  let struct, buffer, parse

  before(() => {
    struct = fixture.struct
    buffer = fixture.buffer
    parse = fixture.parse
  })

  describe('#length()', () => {
    it('returns NaN when structure is not predictable', () => {
      struct.length().should.deep.equal(NaN)
    })
  })

  describe('#parse()', () => {
    it('parses a buffer based on a dictionary', () => {
      struct.parse(buffer).should.deep.equal(parse)
    })
  })

  describe('#parsedLength()', () => {
    it('returns length based on bytes parsed', () => {
      struct.parsedLength().should.equal(251)
    })
  })

  describe('#serialize()', () => {
    it('serializes data based on a dictionary', () => {
      struct.serialize(parse).should.deep.equal(buffer)
    })
  })
})
