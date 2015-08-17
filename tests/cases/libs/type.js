'use strict';

require('chai').should();

const DataTypes = require('../../../index').DataTypes;
const fixture   = require('../../fixtures/libs/type');

describe('DataType', function () {
  describe('#BYTE()', function () {
    it('responds with the number 1', function () {
      DataTypes.BYTE().should.deep.equal(fixture.byte);
    });

    it('responds with the number 2 when passed the argument "2"', function () {
      DataTypes.BYTE(2).should.deep.equal(fixture.byte2);
    });
  });

  describe('#WORD()', function () {
    it('responds with a string descriptor of byte length 2', function () {
      DataTypes.WORD().should.deep.equal(fixture.byte2);
    });

    it('responds with a string descriptor of byte length 4 when passed the argument "2"', function () {
      DataTypes.WORD(2).should.deep.equal(fixture.word2);
    });
  });

  describe('#DWORD()', function () {
    it('responds with a string descriptor of byte length 4', function () {
      DataTypes.DWORD().should.deep.equal(fixture.word2);
    });
  });

  describe('#NUMBER()', function () {
    it('responds with a number descriptor of byte length 2', function () {
      const format = DataTypes.NUMBER(2);

      format.should.have.keys([ 'conv', 'length' ]);
      format.conv.should.be.a('function');
      format.conv('02').should.equal(2);
      format.length.should.equal(2);
    });
  });

  describe('#STRING()', function () {
    it('responds with a string descriptor of byte length ""', function () {
      DataTypes.STRING().should.deep.equal(fixture.string);
    });

    it('responds with a string descriptor of byte length "attr.length" when passed the argument "attr.length"', function () {
      DataTypes.STRING('attr.length').should.deep.equal(fixture.string2);
    });
  });

  describe('#ARRAY()', function () {
    it('responds with an array descriptor of byte length ""', function () {
      DataTypes.ARRAY().should.deep.equal(fixture.array);
    });

    it('responds with an array descriptor of byte length "attr.length" when passed the argument "attr.length"', function () {
      DataTypes.ARRAY('attr.length').should.deep.equal(fixture.array2);
    });
  });

  describe('#UTF8()', function () {
    it('responds with a utf8 descriptor of byte length ""', function () {
      const format = DataTypes.UTF8();

      format.should.have.keys([ 'conv', 'length' ]);
      format.conv.should.be.a('function');
      format.conv('4d4d').should.deep.equal('MM');
      format.length.should.equal('');
    });

    it('responds with a utf8 descriptor of byte length "attr.length"', function () {
      const format = DataTypes.UTF8('attr.length');

      format.should.have.keys([ 'conv', 'length' ]);
      format.conv.should.be.a('function');
      format.conv('4d4d36').should.deep.equal('MM6');
      format.length.should.equal('attr.length');
    });
  });

  describe('#BUFFER()', function () {
    it('responds with a buffer descriptor of byte length ""', function () {
      const format = DataTypes.BUFFER();

      format.should.have.keys([ 'conv', 'length' ]);
      format.conv.should.be.a('function');
      format.conv('0203').should.deep.equal(new Buffer('0203', 'hex'));
      format.length.should.equal('');
    });

    it('responds with a buffer descriptor of byte length "attr.length" when passed the argument "attr.length"', function () {
      const format = DataTypes.BUFFER('attr.length');

      format.should.have.keys([ 'conv', 'length' ]);
      format.conv.should.be.a('function');
      format.conv('0203').should.deep.equal(new Buffer('0203', 'hex'));
      format.length.should.equal('attr.length');
    });
  });
});
