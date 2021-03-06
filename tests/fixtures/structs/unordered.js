'use strict'

const _ = require('lodash')
const Struct = require('../../../index')
const DataTypes = require('../../../libs/type')

const dictionary = {
  '0001': { name: 'heartbeat', type: DataTypes.NUMBER(2) },
  '0002': { name: 'tcpOvertime', type: DataTypes.NUMBER(2) },
  '0003': { name: 'tcpRetransmission', type: DataTypes.NUMBER(2) },
  '0004': { name: 'udpOvertime', type: DataTypes.NUMBER(2) },
  '0005': { name: 'udpRetransmission', type: DataTypes.NUMBER(2) },
  '0006': { name: 'serverIp', type: DataTypes.UTF8 },
  '0007': { name: 'serverDomain', type: DataTypes.UTF8 },
  '0008': { name: 'serverTcpPort', type: DataTypes.NUMBER(2) },
  '0009': { name: 'serverUdpPort', type: DataTypes.NUMBER(2) },
  '0010': { name: 'wirelessApn', type: DataTypes.UTF8 },
  '0011': { name: 'wirelessUsername', type: DataTypes.UTF8 },
  '0012': { name: 'wirelessPassword', type: DataTypes.UTF8 },
  '0013': '0013',
  '0014': { name: 'deviceConnection', type: DataTypes.NUMBER },
  '0015': { name: 'deviceNetwork', type: DataTypes.NUMBER },
  '0016': '0016',
  '0017': '0017',
  '0018': '0018',
  '0019': '0019',
  '0020': { name: 'uploadInterval', type: DataTypes.NUMBER(2) },
  '0021': { name: 'thresholdSpeed', type: DataTypes.NUMBER(2) },
  '0022': { name: 'thresholdLowBattery', type: DataTypes.NUMBER(2) },
  '0023': { name: 'thresholdRotateSpeed', type: DataTypes.NUMBER(2) },
  '0024': { name: 'thresholdNoFlameout', type: DataTypes.NUMBER(2) },
  '0025': { name: 'thresholdWaterTemp', type: DataTypes.NUMBER(2) },
  '0026': { name: 'thresholdQuickAccel', type: DataTypes.NUMBER(2) },
  '0027': { name: 'thresholdQuickDeccel', type: DataTypes.NUMBER(2) },
  '0028': { name: 'thresholdTow', type: DataTypes.NUMBER(2) },
  '0029': { name: 'thresholdExhaust', type: DataTypes.NUMBER(2) },
  '0030': { name: 'collisionLevel', type: DataTypes.NUMBER(2) },
  '0031': { name: 'thresholdLongDrive', type: DataTypes.NUMBER(2) },
  '0032': '0032',
  '0033': '0033',
  '0034': '0034',
  '0035': '0035',
  '0036': '0036',
  '0037': '0037',
  '0038': '0038',
  '0039': '0039',
  '0040': '0040',
  '0041': { name: 'deviceMode', type: DataTypes.NUMBER },
  '0042': { name: 'deviceId', type: DataTypes.UTF8 },
  '0043': { name: 'deviceMtkVersion', type: DataTypes.UTF8 },
  '0044': { name: 'deviceObdVersion', type: DataTypes.UTF8 },
  '0045': { name: 'deviceBlindArea', type: DataTypes.NUMBER },
  '0046': { name: 'angleOfCorner', type: DataTypes.NUMBER(2) },
  '0047': { name: 'engineDisplacement', type: DataTypes.NUMBER(2) },
  '0048': { name: 'fuelType', type: DataTypes.NUMBER },
  '0049': { name: 'timezone', type: DataTypes.BYTE(2) },
  '0050': { name: 'voiceMode', type: DataTypes.NUMBER },
  '0051': '0051',
  '0052': '0052',
  '0053': '0053',
  '0054': '0054',
  '0055': '0055',
  '0056': '0056',
  '0057': '0057',
  '0058': '0058',
  '0059': '0059',
  '0060': '0060',
  '0061': '0061',
  '0062': '0062',
  '0063': '0063',
  '0064': '0064',
  '0065': '0065',
  '0066': '0066',
  '0067': '0067',
  '0068': '0068',
  '0069': '0069',
  '0070': '0070',
  '0071': '0071',
  '0072': '0072',
  '0073': '0073',
  '0074': '0074',
  '0075': '0075',
  '0076': '0076',
  '0077': '0077',
  '0078': '0078',
  '0079': '0079',
  '0080': '0080',
  '0081': '0081',
  '0082': '0082',
  '0083': '0083',
  '0084': '0084',
  '0085': '0085',
  '0086': '0086',
  '0087': '0087',
  '0088': '0088',
  '0089': '0089',
  '0090': '0090',
  '0091': '0091',
  '0092': '0092',
  '0093': '0093',
  '0094': '0094',
  '0095': '0095',
  '0096': '0096',
  '0097': '0097',
  '0098': '0098',
  '0099': '0099'
}

module.exports = {
  struct: new Struct.Unordered([
    [ 'id', DataTypes.WORD ],
    [ 'length', DataTypes.NUMBER ],
    [ 'value', DataTypes.STRING('length') ]
  ],
  dictionary,
  {
    parse: function (value, dictionary, obj) {
      const id = value.id
      const dict = dictionary[id]

      if (dict) {
        let type = dict.type

        type = _.isFunction(type) ? type() : type

        obj[dict.name] = type.parse(value.value)
      }
    },

    serialize: function (json, dictionary) {
      return _.map(json, function (o, name) {
        const k = _.findKey(dictionary, { name })
        const item = dictionary[k]

        let type = item.type
        type = _.isFunction(type) ? type() : type

        let ret = {
          id: k,
          length: type.length,
          value: type.serialize(o)
        }

        if (!ret.length) {
          // set the byte length
          // byte length = length / 2
          ret.length = ret.value.length / 2
        }

        return ret
      })
    }
  }),

  dictionary,

  buffer: new Buffer('000102003C000202000A0003020003000402000A000502000300060F3132382E3139392E3133322E3231310008020539000902229D00070E6F62642E77696E6C62732E636F6D001401000015010000100863656C636F6D3367001100001200002002001E0021020078002202044C0023021194002402000F00250200780026020050002702005000280200000029020000003002000100310200F00041010000420C38313431323030363737383000431848422D4D3631382D31343037392D56312E312E3928454E2900441448422D4D3631382D31343033332D56312E322E3500450101004602000F004702008200480100004902080000500100', 'hex'),

  parse: {
    heartbeat: 60,
    tcpOvertime: 10,
    tcpRetransmission: 3,
    udpOvertime: 10,
    udpRetransmission: 3,
    serverIp: '128.199.132.211',
    serverTcpPort: 1337,
    serverUdpPort: 8861,
    serverDomain: 'obd.winlbs.com',
    deviceConnection: 0,
    deviceNetwork: 0,
    wirelessApn: 'celcom3g',
    wirelessUsername: '',
    wirelessPassword: '',
    uploadInterval: 30,
    thresholdSpeed: 120,
    thresholdLowBattery: 1100,
    thresholdRotateSpeed: 4500,
    thresholdNoFlameout: 15,
    thresholdWaterTemp: 120,
    thresholdQuickAccel: 80,
    thresholdQuickDeccel: 80,
    thresholdTow: 0,
    thresholdExhaust: 0,
    collisionLevel: 1,
    thresholdLongDrive: 240,
    deviceMode: 0,
    deviceId: '814120067780',
    deviceMtkVersion: 'HB-M618-14079-V1.1.9(EN)',
    deviceObdVersion: 'HB-M618-14033-V1.2.5',
    deviceBlindArea: 1,
    angleOfCorner: 15,
    engineDisplacement: 130,
    fuelType: 0,
    timezone: '0800',
    voiceMode: 0
  }
}
