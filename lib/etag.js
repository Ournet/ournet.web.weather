var core = require('ournet.core');

module.exports = function(body, encoding) {
  return core.util.md5(body);
}
