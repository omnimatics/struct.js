'use strict';

const _      = require('lodash');
const common = require('../libs/common');
const Struct = require('./');

class BinaryStruct extends Struct {
  constructor(struct) {
    super(struct);
  }

  length() {
    let totalLen = _totalLength(this.struct);

    // convert bit length to bytes
    return Math.ceil(totalLen / 8);
  }

  parse(buffer) {
    let struct = this.struct;

    let bin      = buffer.toString('hex');
    let totalLen = _totalLength(struct);
    let pos      = 0;
    let ret      = {};

    bin = parseInt(bin, 16).toString(2);
    bin = _.padLeft(bin, totalLen, '0');

    _.each(struct.reverse(), function (s) {
      let key, len;

      s = common.objectify(s);

      key = s.id;
      len = s.val;

      if (!_validLength(len)) {
        throw new Error(`Invalid length, please specify a number. Got : ${key} => ${len}`);
      }

      ret[key] = bin.substring(pos, pos + len);
      ret[key] = parseInt(ret[key], 2);

      pos += len;
    });

    return ret;
  }

  serialize() {
    // TODO
  }
}

function _totalLength(struct) {
  let lens = _.map(struct, function (s) {
    return _.values(s)[0];
  });

  return _.reduce(lens, function (prev, curr) {
    return prev + curr;
  });
}

function _validLength(len) {
  let ret = true;

  if (!_.isNumber(len) || len < 0) {
    ret = false;
  }

  return ret;
}

module.exports = BinaryStruct;
