const handleErrors = (err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
};

module.exports = handleErrors;
