'use strict';

require('chai').should();

const DataTypes = require('../../../index').DataTypes;

describe('DataType', function () {
  describe('#BYTE()', function () {
    it('responds with the number 1', function () {
      DataTypes.BYTE().should.deep.equal({
        type   : String,
        length : 1
      });
    });

    it('responds with the number 2 when passed the argument "2"', function () {
      DataTypes.BYTE(2).should.deep.equal({
        type   : String,
        length : 2
      });
    });
  });

  describe('#WORD()', function () {
    it('responds with a string descriptor of byte length 2', function () {
      DataTypes.WORD().should.deep.equal({
        type   : String,
        length : 2
      });
    });

    it('responds with a string descriptor of byte length 4 when passed the argument "2"', function () {
      DataTypes.WORD(2).should.deep.equal({
        type   : String,
        length : 4
      });
    });
  });

  describe('#DWORD()', function () {
    it('responds with a string descriptor of byte length 4', function () {
      DataTypes.DWORD().should.deep.equal({
        type   : String,
        length : 4
      });
    });
  });

  describe('#NUMBER()', function () {
    it('responds with a number descriptor of byte length 2', function () {
      DataTypes.NUMBER(2).should.deep.equal({
        type   : Number,
        length : 2
      });
    });
  });

  describe('#STRING()', function () {
    it('responds with a string descriptor of byte length ""', function () {
      DataTypes.STRING().should.deep.equal({
        type   : String,
        length : ''
      });
    });

    it('responds with a string descriptor of byte length "attr.length" when passed the argument "attr.length"', function () {
      DataTypes.STRING('attr.length').should.deep.equal({
        type   : String,
        length : 'attr.length'
      });
    });
  });

  describe('#ARRAY()', function () {
    it('responds with an array descriptor of byte length ""', function () {
      DataTypes.ARRAY().should.deep.equal({
        type   : Array,
        length : ''
      });
    });

    it('responds with an array descriptor of byte length "attr.length" when passed the argument "attr.length"', function () {
      DataTypes.ARRAY('attr.length').should.deep.equal({
        type   : Array,
        length : 'attr.length'
      });
    });
  });

  describe('#BUFFER()', function () {
    it('responds with a buffer descriptor of byte length ""', function () {
      DataTypes.BUFFER().should.deep.equal({
        type   : Buffer,
        length : ''
      });
    });

    it('responds with a buffer descriptor of byte length "attr.length" when passed the argument "attr.length"', function () {
      DataTypes.BUFFER('attr.length').should.deep.equal({
        type   : Buffer,
        length : 'attr.length'
      });
    });
  });
});
