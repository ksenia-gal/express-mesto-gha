const router = require('express').Router();

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
router.post('/', createCard);
// удаляет карточку по идентификатору
router.delete('/:cardId', deleteCard);
// ставит лайк карточке
router.put('/:cardId/likes', putLike);
// удаляет лайк с карточки:
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
