const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  changeUserAvatar,
  changeUserInfo,
} = require('../controllers/users');
const { REGEX } = require('../utils/constants');

// возвращает всех пользователей из базы данных
router.get('/', getUsers);
// возвращает информацию о текущем пользователе
router.get('/me', getCurrentUser);
// возвращает пользователя по переданному _id
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
// обновляет аватар пользователя
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(REGEX),
  }),
}), changeUserAvatar);
// редактирует данные пользователя
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), changeUserInfo);

module.exports = router;
