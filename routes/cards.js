const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// // const { ObjectId } = require('mongoose').Types;
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
    link: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Неверный формат ссылки на изображение');
    }),
  }),
}), createCard);
// удаляет карточку по идентификатору
router.delete('/:cardId', deleteCard);
// ставит лайк карточке
router.put('/:cardId/likes', putLike);
// удаляет лайк с карточки:
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
