const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORISED = 401; // передан неверный логин или пароль.
// Также эту ошибку возвращает авторизационный middleware, если передан неверный JWT;
const FORBIDDEN = 403; // например, при попытке удалить чужую карточку
const NOT_FOUND = 404;
const CONFLICT = 409; // user exists -
// при регистрации указан email, который уже существует на сервере
const INTERNAL_SERVER_ERROR = 500;

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORISED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
};
