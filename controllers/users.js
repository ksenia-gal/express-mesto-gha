const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const AuthorizationError = require('../errors/unauthorisedError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
        // вернем токен
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .send({ token });
      throw new AuthorizationError('Неправильные почта или пароль');
    })
    .catch(next);
};

// получение всех пользователей из базы данных +
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// получение конкретного пользователя по id
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id пользователя'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(err);
      }
    });
};

// получение текущего пользователя
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id пользователя'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(err);
      }
    });
};

// создание пользователя
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password || password.length < 4) {
    throw new NotFoundError('Пароль отсутствует или короче 4 символов');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

// обновление аватара пользователя
const changeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении аватара');
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
    })
    .catch(next);
};

// редактирование данных пользователя
const changeUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при редактировании данных профиля');
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
    })
    .catch(next);
};

module.exports = {
  login,
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  changeUserAvatar,
  changeUserInfo,
};
