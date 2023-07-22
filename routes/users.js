const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  changeUserAvatar,
  changeUserInfo,
} = require('../controllers/users');

// возвращает всех пользователей из базы данных
router.get('/', getUsers);
// возвращает информацию о текущем пользователе
router.get('/me', getCurrentUser);
// возвращает пользователя по переданному _id
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
}), getUserById);
// обновляет аватар пользователя
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
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
