'use strict';

require('chai').should();

const DataTypes = require('../../../index').DataTypes;
const fixture   = require('../../fixtures/libs/type');

describe('DataType', function () {
  describe('#BYTE()', function () {
    it('responds with the number 1', function () {
      const format = DataTypes.BYTE();

      format.should.deep.equal(fixture.byte);

      format.parse.should.be.a('function');
      format.parse(25).should.equal('25');

      format.serialize.should.be.a('function');
      format.serialize('15').should.equal('15');
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

      format.should.have.keys(fixture.number.keys);

      format.parse.should.be.a('function');
      format.parse('02').should.equal(2);

      format.serialize.should.be.a('function');
      format.serialize(25).should.equal('0019');

      format.length.should.equal(2);
    });
  });

  describe('#STRING()', function () {
    it('responds with a string descriptor of byte length ""', function () {
      const format = DataTypes.STRING();

      format.should.deep.equal(fixture.string);

      format.parse.should.be.a('function');
      format.parse(19).should.equal('19');

      format.serialize.should.be.a('function');
      format.serialize('25').should.equal('25');

      format.length.should.equal('');
    });

    it('responds with a string descriptor of byte length "attr.length" when passed the argument "attr.length"', function () {
      const format = DataTypes.STRING('attr.length');

      format.should.deep.equal(fixture.string2);

      format.parse.should.be.a('function');
      format.parse(19).should.equal('19');

      format.serialize.should.be.a('function');
      format.serialize('25').should.equal('25');

      format.length.should.equal('attr.length');
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

      format.should.have.keys(fixture.utf8.keys);

      format.parse.should.be.a('function');
      format.parse('4d4d').should.deep.equal('MM');

      format.serialize.should.be.a('function');
      format.serialize('MM').should.deep.equal('4d4d');

      format.length.should.equal('');
    });

    it('responds with a utf8 descriptor of byte length "attr.length"', function () {
      const format = DataTypes.UTF8('attr.length');

      format.should.have.keys(fixture.utf8.keys);

      format.parse.should.be.a('function');
      format.parse('4d4d36').should.deep.equal('MM6');

      format.serialize.should.be.a('function');
      format.serialize('MM6').should.deep.equal('4d4d36');

      format.length.should.equal('attr.length');
    });
  });

  describe('#BCD()', function () {
    it('responds with a BCD descriptor of byte length "1"', function () {
      const format = DataTypes.BCD();

      format.should.have.keys([ 'parse', 'length' ]);
      format.parse.should.be.a('function');
      format.parse('150505073015').should.deep.equal('2015-05-05T07:30:15+08:00');
      format.length.should.equal(1);
    });

    it('responds with a BCD descriptor of byte length "6"', function () {
      const format = DataTypes.BCD(6);

      format.should.have.keys([ 'parse', 'length' ]);
      format.parse.should.be.a('function');
      format.parse('150505073015').should.deep.equal('2015-05-05T07:30:15+08:00');
      format.length.should.equal(6);
    });
  });

  describe('#BINARY()', function () {
    it('responds with a binary descriptor of byte length "1"', function () {
      const format = DataTypes.BINARY();

      format.should.have.keys([ 'parse', 'length' ]);
      format.parse.should.be.a('function');
      format.parse('4d').should.deep.equal('01001101');
      format.length.should.equal(1);
    });

    it('responds with a binary descriptor of byte length "6"', function () {
      const format = DataTypes.BINARY(2);

      format.should.have.keys([ 'parse', 'length' ]);
      format.parse.should.be.a('function');
      format.parse('00ff').should.deep.equal('0000000011111111');
      format.length.should.equal(2);
    });
  });

  describe('#BUFFER()', function () {
    it('responds with a buffer descriptor of byte length ""', function () {
      const format = DataTypes.BUFFER();

      format.should.have.keys([ 'parse', 'length' ]);
      format.parse.should.be.a('function');
      format.parse('0203').should.deep.equal(new Buffer('0203', 'hex'));
      format.length.should.equal('');
    });

    it('responds with a buffer descriptor of byte length "attr.length" when passed the argument "attr.length"', function () {
      const format = DataTypes.BUFFER('attr.length');

      format.should.have.keys([ 'parse', 'length' ]);
      format.parse.should.be.a('function');
      format.parse('0203').should.deep.equal(new Buffer('0203', 'hex'));
      format.length.should.equal('attr.length');
    });
  });
});
