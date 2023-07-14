const User = require('../models/user');

// получение всех пользователей из базы данных
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res
      .status(500)
      .send({ message: 'Произошла ошибка, сервер не смог обработать запрос' }));
};

// получение конкретного пользователя по id
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Передан некорректный id пользователя',
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
      return res.status(500).send({
        message: 'Произошла ошибка, сервер не смог обработать запрос',
      });
    });
};

// создание пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message:
            'Переданы некорректные данные при создании пользователя',
        });
      } else {
        res.status(500).send({
          message: 'Произошла ошибка, сервер не смог обработать запрос',
        });
      }
    });
};

// обновление аватара пользователя
const changeUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
      return res.status(500).send({
        message: 'Произошла ошибка, сервер не смог обработать запрос',
      });
    });
};

// редактирование данных пользователя
const changeUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({
          message:
            'Переданы некорректные данные при редактировании данных профиля',
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Запрашиваемый пользователь не найден',
        });
      }
      return res.status(500).send({
        message: 'Произошла ошибка, сервер не смог обработать запрос',
      });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  changeUserAvatar,
  changeUserInfo,
};
