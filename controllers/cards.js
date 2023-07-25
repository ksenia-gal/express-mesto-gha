const Card = require('../models/card');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/unauthorisedError');
const ForbiddenError = require('../errors/forbiddenError');

// добавление массива карточек на страницу
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// создание новой карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Произошла ошибка при создании новой карточки, переданы некорректные данные');
      }
    })
    .catch(next);
};

// удаление карточки
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .catch(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      if (String(card.owner) === String(req.user._id)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((cardData) => res.send(cardData));
      } else {
        throw new ForbiddenError('Недостаточно прав');
      }
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
    })
    .catch(next);
};

// добавление лайка
const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (err.name === 'CastError') {
        throw new BadRequestError('Произошла ошибка при добавлении лайка, переданы некорректные данные');
      }
    })
    .catch(next);
};

// удаление лайка
const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (err.name === 'CastError') {
        throw new BadRequestError('Произошла ошибка при удалении лайка, переданы некорректные данные');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
