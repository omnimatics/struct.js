'use strict';

const Struct    = require('../../../index');
const DataTypes = require('../../../libs/type');

module.exports = {
  struct : new Struct.Unordered([
    [ 'id', DataTypes.BYTE ],
    [ 'length', DataTypes.NUMBER(2) ],
    [ 'value', DataTypes.STRING('length') ]
  ], {
    'a0' : new Struct.Struct([
      [ 'tripId', DataTypes.BYTE(4) ],
      [ 'delay', DataTypes.BYTE ],
      [ 'streamSize', DataTypes.NUMBER ],
      [
        'data', new Struct.Array([
          [ 'length', DataTypes.NUMBER ],

          [
            'body', new Struct.Array([
              [ 'id', DataTypes.BYTE ],
              [ 'length', DataTypes.NUMBER ],
              [ 'content', DataTypes.STRING('length') ]
            ], 11)
          ]
        ])
      ]
    ]),

    'a1' : new Struct.Struct([
      [ 'lat', DataTypes.BYTE(4) ],
      [ 'lng', DataTypes.BYTE(4) ],
      [ 'elevation', DataTypes.BYTE(2) ],
      [ 'speed', DataTypes.BYTE(2) ],
      [ 'direction', DataTypes.WORD ],
    ]),

    'a2' : new Struct.Struct([
      [ 'mcc', DataTypes.BYTE(3) ],
      [ 'mnc', DataTypes.BYTE ],
      [ 'lac', DataTypes.BYTE(2) ],
      [ 'cellId', DataTypes.BYTE(2) ]
    ]),

    'a3' : new Struct.Struct([
    ]),

    'a4' : new Struct.Struct([
    ])
  }, {
    parse : function (value, dictionary, obj) {
      const id     = value.id;
      const dict   = dictionary[id];
      const buffer = new Buffer(value.value, 'hex');

      let ret = dict.parse(buffer);

      obj[id] = ret;
    },

    serialize : function () {
    }
  }),

  parse : {
    a0 : {
      tripId     : '15070013',
      delay      : '01',
      streamSize : 27,

      data : [
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0509' },
            { id: '0c', length: 2, content: '2192' },
            { id: '0d', length: 1, content: '30' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '04d4' },
            { id: '0c', length: 2, content: '2192' },
            { id: '0d', length: 1, content: '30' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '04d4' },
            { id: '0c', length: 2, content: '2192' },
            { id: '0d', length: 1, content: '30' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0086' },
            { id: '0c', length: 2, content: '0d40' },
            { id: '0d', length: 1, content: '2a' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '008f' },
            { id: '0c', length: 2, content: '0d40' },
            { id: '0d', length: 1, content: '27' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '008e' },
            { id: '0c', length: 2, content: '0a46' },
            { id: '0d', length: 1, content: '20' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '00ad' },
            { id: '0c', length: 2, content: '0a46' },
            { id: '0d', length: 1, content: '18' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0124' },
            { id: '0c', length: 2, content: '08c1' },
            { id: '0d', length: 1, content: '0d' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0194' },
            { id: '0c', length: 2, content: '08c1' },
            { id: '0d', length: 1, content: '07' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '045b' },
            { id: '0c', length: 2, content: '0a29' },
            { id: '0d', length: 1, content: '03' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '004e' },
            { id: '0c', length: 2, content: '0a29' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0055' },
            { id: '0c', length: 2, content: '0a66' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0055' },
            { id: '0c', length: 2, content: '0a66' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0055' },
            { id: '0c', length: 2, content: '0a66' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0045' },
            { id: '0c', length: 2, content: '0a95' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0045' },
            { id: '0c', length: 2, content: '0a95' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0042' },
            { id: '0c', length: 2, content: '09d8' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '003f' },
            { id: '0c', length: 2, content: '0984' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '003f' },
            { id: '0c', length: 2, content: '0984' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '003f' },
            { id: '0c', length: 2, content: '0984' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0039' },
            { id: '0c', length: 2, content: '0a51' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '0039' },
            { id: '0c', length: 2, content: '0a51' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '003b' },
            { id: '0c', length: 2, content: '0a5b' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '003b' },
            { id: '0c', length: 2, content: '0a5b' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '003a' },
            { id: '0c', length: 2, content: '0a53' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '003a' },
            { id: '0c', length: 2, content: '0a53' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
        {
          length : 11,
          body : [
            { id: 'ff', length: 2, content: '003a' },
            { id: '0c', length: 2, content: '0a53' },
            { id: '0d', length: 1, content: '00' }
          ]
        },
      ]
    },

    a1 : {
      direction : '0000',
      elevation : '0000',
      lat       : '002fdab9',
      lng       : '060f69a4',
      speed     : '0001'
    },

    a2 : {
      cellId : '331a',
      lac    : '5605',
      mcc    : '000502',
      mnc    : '16'
    }
  },

  buffer : new Buffer('a0014a15070013011b0bff0205090c0221920d01300bff0204d40c0221920d01300bff0204d40c0221920d01300bff0200860c020d400d012a0bff02008f0c020d400d01270bff02008e0c020a460d01200bff0200ad0c020a460d01180bff0201240c0208c10d010d0bff0201940c0208c10d01070bff02045b0c020a290d01030bff02004e0c020a290d01000bff0200550c020a660d01000bff0200550c020a660d01000bff0200550c020a660d01000bff0200450c020a950d01000bff0200450c020a950d01000bff0200420c0209d80d01000bff02003f0c0209840d01000bff02003f0c0209840d01000bff02003f0c0209840d01000bff0200390c020a510d01000bff0200390c020a510d01000bff02003b0c020a5b0d01000bff02003b0c020a5b0d01000bff02003a0c020a530d01000bff02003a0c020a530d01000bff02003a0c020a530d0100a1000e002fdab9060f69a4000000010000a20008000502165605331a', 'hex')
};
