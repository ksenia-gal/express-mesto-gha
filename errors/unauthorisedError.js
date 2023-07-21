const { UNAUTHORISED } = require('./errorsStatusCode');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORISED;
  }
}

module.exports = NotFoundError;
