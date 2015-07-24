'use strict';

const _ = require('lodash');

module.exports = {
  objectify : objectify
};

function objectify(o) {
  let keys   = _.keys(o);
  let values = _.values(o);

  return {
    id  : keys[0],
    val : values[0]
  };
}

