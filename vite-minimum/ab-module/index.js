function add(a, b) {
  return a + b;
}

const i = 1;

if (i >= 1) {
  require("./b.js");
}

module.exports = {
  add,
};
