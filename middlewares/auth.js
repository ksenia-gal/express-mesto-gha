const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/unauthorisedError');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new AuthorizationError('Токен остутствует или некорректен'));
  }
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new AuthorizationError('Токен не верифицирован, необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};

module.exports = auth;
