'use strict';

function BYTE(n)  { n = n || 1; return 1 * n; }
function WORD()   { return BYTE(2); }
function DWORD()  { return WORD() * 2; }
function STRING(prop) {
  const ret = prop || '';

  return function () { return ret; };
}

const DataTypes = { 
  BYTE   : BYTE,
  WORD   : WORD,
  DWORD  : DWORD,
  STRING : STRING
};

module.exports = DataTypes;
