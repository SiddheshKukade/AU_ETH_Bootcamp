const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ["red", "green", "blue", "yellow", "pink", "orange"];

// given a hash, return the color that created the hash
function findColor(hash) {
  let ans;
  COLORS.map((c) => {
    let temp = utf8ToBytes(c);
    temp = sha256(temp);
    if (toHex(hash) === toHex(temp)) {
      ans = c;
    }
  });
  return ans;
}

module.exports = findColor;
