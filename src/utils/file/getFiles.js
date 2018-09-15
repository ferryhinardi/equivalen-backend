const glob = require('glob');

module.exports = dir => {
  return glob.sync(dir);
};
