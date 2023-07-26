const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

// возвращает все карточки
router.get('/', getCards);
// создаёт карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required
      .custom((value, helpers) => {
        if (validator.isURL(value)) return value;
        return helpers.message('Некорректный URL');
      }),
  }),
}), createCard);

// удаляет карточку по идентификатору
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) return value;
        return helpers.message('Невалидный id');
      }),
  }),
}), deleteCard);
// ставит лайк карточке
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) return value;
        return helpers.message('Невалидный id');
      }),
  }),
}), putLike);
// удаляет лайк с карточки:
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) return value;
        return helpers.message('Невалидный id');
      }),
  }),
}), deleteLike);

module.exports = router;
