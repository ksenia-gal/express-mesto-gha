// const { NODE_ENV, JWT_SECRET } = process.env;

// // код для авторизации запроса

// const jwt = require('jsonwebtoken');
// const AuthError = require('../errors/unauthorisedError');

// const auth = (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return next(new AuthError('Токен остутствует или некорректен'));
//   }

//   let payload;
//   try {
//     payload = jwt.verify(token, 'secret-key');
//   } catch (err) {
//     next(new AuthError('Токен не верифицирован, авторизация не пройдена'));
//   }

//   req.user = payload;

//   return next();
// };

// module.exports = auth;

const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/unauthorisedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Токен остутствует или некорректен');
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new AuthorizationError('Токен не верифицирован, авторизация не пройдена'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};

module.exports = auth;
