'use strict'

const chai = require('chai')
const common = require('../../../libs/common')
const fixture = require('../../fixtures/structs/array')

chai.should()

describe('Array', () => {
  let s1, p1, b1, b2, s2, p2

  before(() => {
    s1 = fixture.s1
    b1 = fixture.b1
    p1 = fixture.p1

    s2 = fixture.s2
    b2 = fixture.b2
    p2 = fixture.p2
  })

  describe('#length()', () => {
    it('returns NaN when structure is not predictable', () => {
      s1.length().should.deep.equal(NaN)
      s2.length().should.deep.equal(NaN)
    })
  })

  describe('#parse()', () => {
    it('generates a structured object from a serialized string', () => {
      s1.parse(b1).should.deep.equal(p1)
      s2.parse(b2).should.deep.equal(p2)
    })
  })

  describe('#parsedLength()', () => {
    it('returns length based on bytes parsed', () => {
      s1.parsedLength().should.equal(12)
      s2.parsedLength().should.equal(384)
    })
  })

  describe('#serialize()', () => {
    it('serializes a JSON into its hex representation', () => {
      s1.serialize(p1).should.deep.equal(b1)
      s2.serialize(p2).should.deep.equal(b2)
    })
  })
})
