const Card = require('../models/card');
// const ForbiddenError = require('../errors/forbiddenError');
// const NotFoundError = require('../errors/notFoundError');
// const BadRequestError = require('../errors/badRequestError');

// добавление массива карточек на страницу
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({
      message: 'Произошла ошибка при добавлении массива карточек на страницу',
    }));
};

// создание новой карточки
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Произошла ошибка при создании новой карточки, переданы некорректные данные',
        });
      } else {
        res.status(500).send({
          message: 'Произошла ошибка, сервер не смог обработать запрос',
        });
      }
    });
};

// удаление карточки
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Произошла ошибка при удалении карточки, переданы некорректные данные',
        });
      } else {
        res
          .status(500).send({
            message: 'Произошла ошибка, сервер не смог обработать запрос',
          });
      }
    });
};

// добавление лайка
const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Произошла ошибка при добавлении лайка, переданы некорректные данные',
        });
      }
      return res
        .status(500)
        .send({
          message:
            'Произошла ошибка, сервер не смог обработать запрос',
        });
    });
};

// удаление лайка
const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({ message: 'Запрашиваемая карточка не найдена' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message:
            'Произошла ошибка при удалении лайка, переданы некорректные данные',
        });
      }
      return res
        .status(500)
        .send({
          message:
            'Произошла ошибка, сервер не смог обработать запрос',
        });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
