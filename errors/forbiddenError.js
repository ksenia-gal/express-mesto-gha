const { FORBIDDEN } = require('./errorsStatusCode');

class forbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = forbiddenError;
