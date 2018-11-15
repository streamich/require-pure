const mul = require('./demo-imported').mul;

exports.add = (a, b) => {
  return a + b + mul(2, 3);
};
