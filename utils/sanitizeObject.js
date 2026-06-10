const xss = require('xss');

module.exports = function sanitizeObject(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'string') {
      obj[key] = xss(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  });
};
