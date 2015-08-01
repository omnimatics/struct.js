'use strict';

require('chai').should();

const DataTypes = require('../../index').DataTypes;

describe('DataType', function () {
  describe('#BYTE()', function () {
    it('responds with the number 1', function () {
      DataTypes.BYTE().should.equal(1);
    });

    it('responds with the number 2 when passed the argument "2"', function () {
      DataTypes.BYTE(2).should.equal(2);
    });
  });

  describe('#WORD()', function () {
    it('responds with the number 2', function () {
      DataTypes.WORD().should.equal(2);
    });
  });

  describe('#DWORD()', function () {
    it('responds with the number 4', function () {
      DataTypes.DWORD().should.equal(4);
    });
  });

  describe('#STRING()', function () {
    it('responds with the string ""', function () {
      DataTypes.STRING().should.equal('');
    });

    it('responds with the string "attr.length" when passed the argument "attr.length"', function () {
      DataTypes.STRING('attr.length').should.equal('attr.length');
    });
  });
});
