'use strict'

const chai = require('chai')
const structFixtures = require('../../fixtures/structs/struct')

chai.should()

describe('Struct', () => {
  let struct, predStruct, simpleStruct, buffer
  let parse, simpleParse
  let serializable, simpleSerializable

  before(() => {
    struct = structFixtures.struct
    predStruct = structFixtures.predStruct
    simpleStruct = structFixtures.simpleStruct
    buffer = structFixtures.buffer
    parse = structFixtures.parse
    simpleParse = structFixtures.simpleParse
    serializable = structFixtures.serializable
    simpleSerializable = structFixtures.simpleSerializable
  })

  describe('#length()', () => {
    it('returns NaN when structure is not predictable', () => {
      struct.length().should.deep.equal(NaN)
    })

    it('returns length when structure is predictable', () => {
      predStruct.length().should.equal(13)
    })
  })

  describe('#parse()', () => {
    it('generates a structured object from a serialized string', () => {
      struct.parse(buffer).should.deep.equal(parse)
      simpleStruct.parse(buffer).should.deep.equal(simpleParse)
    })
  })

  describe('#parsedLength()', () => {
    it('returns length based on bytes parsed', () => {
      struct.parsedLength().should.equal(39)
    })
  })

  describe('#parsedObject()', () => {
    it('returns object based on bytes parsed', () => {
      struct.parsedObject().should.deep.equal(parse)
    })
  })

  describe('#serialize()', () => {
    it('serializes a JSON into its hex representation', () => {
      struct.serialize(serializable).should.deep.equal(buffer)
      simpleStruct.serialize(simpleSerializable).should.deep.equal(buffer)
    })
  })
})
