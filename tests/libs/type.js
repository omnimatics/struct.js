'use strict';

require('chai').should();

const DataTypes = require('../../index').DataTypes;

describe('DataType', function () {
  describe('#BYTE()', function () {
    it('responds with the number 1', function () {
      return DataTypes.BYTE().should.equal(1);
    });

    it('responds with the number 2 when passed the argument "2"', function () {
      return DataTypes.BYTE(2).should.equal(2);
    });
  });

  describe('#WORD()', function () {
    it('responds with the number 2', function () {
      return DataTypes.WORD().should.equal(2);
    });
  });

  describe('#DWORD()', function () {
    it('responds with the number 4', function () {
      return DataTypes.DWORD().should.equal(4);
    });
  });
});
