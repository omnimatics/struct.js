'use strict'

const _         = require('lodash')
const Struct    = require('../../../index')
const DataTypes = require('../../../libs/type')

module.exports = {
  s1: new Struct.Array([
    [ 'length', DataTypes.NUMBER ],

    [
      'body', new Struct.Array([
        [ 'id', DataTypes.BYTE ],
        [ 'length', DataTypes.NUMBER ],
        [ 'content', DataTypes.STRING('length') ]
      ])
    ]
  ]),

  p1: [
    {
      length: 11,
      body: [
        {
          id: 'ff',
          length: 2,
          content: '0509'
        },

        {
          id: '0c',
          length: 2,
          content: '2192'
        },

        {
          id: '0d',
          length: 1,
          content: '30'
        }
      ]
    }
  ],

  b1: new Buffer('0bff0205090c0221920d0130', 'hex'),

  s2: new Struct.Struct([
    [ 'typeId', DataTypes.WORD ],
    [
      'attr',
      new Struct.Binary([
        [ 'reserve', 2 ],
        [ 'subpackaged', 1 ],
        [ 'encrypted', 3 ],
        [ 'length', 10 ]
      ])
    ],
    [ 'deviceId', DataTypes.BYTE(6) ],
    [ 'serialNo', DataTypes.WORD ],
    [
      'body', new Struct.Struct([
        [ 'uploadTime', DataTypes.BCD(6) ],
        [ 'gpsState', DataTypes.BINARY(4) ],
        [
          'data', new Struct.Unordered([
            [ 'id', DataTypes.BYTE ],
            [ 'length', DataTypes.NUMBER(2) ],
            [ 'value', DataTypes.STRING('length') ]
          ], {
            'a0': new Struct.Struct([
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
                    ], 'length')
                  ]
                ])
              ]
            ]),

            'a1': new Struct.Struct([
              [ 'lat', DataTypes.BYTE(4) ],
              [ 'lng', DataTypes.BYTE(4) ],
              [ 'elevation', DataTypes.BYTE(2) ],
              [ 'speed', DataTypes.BYTE(2) ],
              [ 'direction', DataTypes.WORD ],
            ]),

            'a2': new Struct.Struct([
              [ 'mcc', DataTypes.BYTE(3) ],
              [ 'mnc', DataTypes.BYTE ],
              [ 'lac', DataTypes.BYTE(2) ],
              [ 'cellId', DataTypes.BYTE(2) ]
            ]),

            'a3': new Struct.Struct([
              [ 'quantity', DataTypes.BYTE ],
              [
                'dtcs', new Struct.Array([
                  [ 'dtc', DataTypes.BYTE(3) ]
                ], 'quantity')
              ]
            ]),

            'a4': new Struct.Struct([
              [ 'quantity', DataTypes.BYTE ],
              [
                'alarms', new Struct.Array([
                  [ 'alarm', DataTypes.BYTE(4) ]
                ], 'quantity')
              ]
            ])
          }),
        ]
      ], 'attr.length')
    ],
    [ 'crc', new Struct.CRC(0, -1) ]
  ]),

  p2: {
    typeId: '3006',
    attr: {
      reserve: 0,
      subpackaged: 0,
      encrypted: 0,
      length: 371
    },
    deviceId: '814120067780',
    serialNo: '0023',
    body: {
      uploadTime: '2015-07-02T01:46:41+08:00',
      gpsState: '00000000000000011111111100101101',
      data: {
        a0: {
          tripId: '15070013',
          delay: '01',
          streamSize: 27,

          data: [
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0509' },
                { id: '0c', length: 2, content: '2192' },
                { id: '0d', length: 1, content: '30' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '04d4' },
                { id: '0c', length: 2, content: '2192' },
                { id: '0d', length: 1, content: '30' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '04d4' },
                { id: '0c', length: 2, content: '2192' },
                { id: '0d', length: 1, content: '30' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0086' },
                { id: '0c', length: 2, content: '0d40' },
                { id: '0d', length: 1, content: '2a' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '008f' },
                { id: '0c', length: 2, content: '0d40' },
                { id: '0d', length: 1, content: '27' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '008e' },
                { id: '0c', length: 2, content: '0a46' },
                { id: '0d', length: 1, content: '20' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '00ad' },
                { id: '0c', length: 2, content: '0a46' },
                { id: '0d', length: 1, content: '18' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0124' },
                { id: '0c', length: 2, content: '08c1' },
                { id: '0d', length: 1, content: '0d' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0194' },
                { id: '0c', length: 2, content: '08c1' },
                { id: '0d', length: 1, content: '07' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '045b' },
                { id: '0c', length: 2, content: '0a29' },
                { id: '0d', length: 1, content: '03' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '004e' },
                { id: '0c', length: 2, content: '0a29' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0055' },
                { id: '0c', length: 2, content: '0a66' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0055' },
                { id: '0c', length: 2, content: '0a66' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0055' },
                { id: '0c', length: 2, content: '0a66' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0045' },
                { id: '0c', length: 2, content: '0a95' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0045' },
                { id: '0c', length: 2, content: '0a95' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0042' },
                { id: '0c', length: 2, content: '09d8' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '003f' },
                { id: '0c', length: 2, content: '0984' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '003f' },
                { id: '0c', length: 2, content: '0984' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '003f' },
                { id: '0c', length: 2, content: '0984' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0039' },
                { id: '0c', length: 2, content: '0a51' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '0039' },
                { id: '0c', length: 2, content: '0a51' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '003b' },
                { id: '0c', length: 2, content: '0a5b' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '003b' },
                { id: '0c', length: 2, content: '0a5b' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '003a' },
                { id: '0c', length: 2, content: '0a53' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '003a' },
                { id: '0c', length: 2, content: '0a53' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
            {
              length: 11,
              body: [
                { id: 'ff', length: 2, content: '003a' },
                { id: '0c', length: 2, content: '0a53' },
                { id: '0d', length: 1, content: '00' }
              ]
            },
          ]
        },

        a1: {
          direction: '0000',
          elevation: '0000',
          lat: '002fdab9',
          lng: '060f69a4',
          speed: '0001'
        },

        a2: {
          cellId: '331a',
          lac: '5605',
          mcc: '000502',
          mnc: '16'
        }
      }
    },
    crc: '13'
  },

  b2: new Buffer('3006017381412006778000231507020146410001FF2DA0014A15070013011B0BFF0205090C0221920D01300BFF0204D40C0221920D01300BFF0204D40C0221920D01300BFF0200860C020D400D012A0BFF02008F0C020D400D01270BFF02008E0C020A460D01200BFF0200AD0C020A460D01180BFF0201240C0208C10D010D0BFF0201940C0208C10D01070BFF02045B0C020A290D01030BFF02004E0C020A290D01000BFF0200550C020A660D01000BFF0200550C020A660D01000BFF0200550C020A660D01000BFF0200450C020A950D01000BFF0200450C020A950D01000BFF0200420C0209D80D01000BFF02003F0C0209840D01000BFF02003F0C0209840D01000BFF02003F0C0209840D01000BFF0200390C020A510D01000BFF0200390C020A510D01000BFF02003B0C020A5B0D01000BFF02003B0C020A5B0D01000BFF02003A0C020A530D01000BFF02003A0C020A530D01000BFF02003A0C020A530D0100A1000E002FDAB9060F69A4000000010000A20008000502165605331A13', 'hex')
}
