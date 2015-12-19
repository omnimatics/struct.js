'use strict'

const _ = require('lodash')
const common = require('../libs/common')
const Struct = require('./')

/**
 * @class Unordered
 * @extends Struct
 */
class Unordered extends Struct {
  /**
   * @constructor
   * @param {Object} struct 
   * @param {Object} dictionary
   * @param {Function} map 
   * @param {number|string} maxLength
   */
  constructor(struct, dictionary, map, maxLength) {
    super(struct)

    const self = this

    self.dictionary = dictionary || {}
    self.map = map || {}
    self.maxLength = maxLength

    // set parent for dictionary items
    _.each(self.dictionary, (item) => {
      if (item instanceof Struct) {
        item.parent = self
      }
    })

    // set parse and serialize defaults
    self.map = _.merge({
      parse: (value, dictionary, obj) => {
        const id = value.id
        const buffer = new Buffer(value.value, 'hex')
        const dict = dictionary[id]

        obj[id] = dict.parse(buffer)
      },

      serialize: (json, dictionary) => {
        return _.map(json, (o, key) => {
          const dict = dictionary[key]
          const ret = {
            id: key,
            value: dict.serialize(o)
          }

          // set the byte length
          ret.length = ret.value.length

          return ret
        })
      }
    }, self.map)
  }

  /**
   * Parses the buffer to generate structured data.
   *
   * @method parse
   * @param {Buffer} buffer
   * @param {number} pos
   * @param {Buffer} fullBuffer
   */
  parse(buffer, pos, fullBuffer) {
    const self = this
    const struct = self.struct

    let arrRet = []
    let maxLength = buffer.length

    pos = 0

    if (self.maxLength) {
      if (_.isString(self.maxLength) && self.parent) {
        let p = self

        do {
          p = p.parent
          maxLength = _.get(p._parsedObject, self.maxLength)
        } while (!maxLength && p.parent)
      } else {
        maxLength = self.maxLength
      }
    }

    while (pos < maxLength) {
      const ret = {}
      pos = this._parseStruct(buffer, pos, ret)

      arrRet.push(ret)
    }

    if (_.isFunction(self.map.parse)) {
      let ret = {}

      _.each(arrRet, function (value) {
        self.map.parse.call(this, value, self.dictionary, ret)
      })

      arrRet = ret
    }

    return arrRet
  }

  /**
   * Converts structured data into raw data.
   *
   * @method serialize
   * @param {Object} json
   */
  serialize(json) {
    const struct = this.struct
    const dictionary = this.dictionary
    const map = this.map

    let compile = []

    if (_.isFunction(map.serialize)) {
      compile = map.serialize(json, dictionary)
    }

    const hex = _.map(compile, (i) => {
      const curr = _.map(struct, (s) => {
        let ret, key, type

        key = s[0]
        type = s[1]

        type = _.isFunction(type) ? type() : type
        ret = type.serialize(i[key])

        if (Buffer.isBuffer(ret)) {
          ret = ret.toString('hex')
        }

        return ret
      })

      return curr.join('')
    })

    return new Buffer(hex.join(''), 'hex')
  }
}

module.exports = Unordered
