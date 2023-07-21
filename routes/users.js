const router = require('express').Router();

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
router.get('/:userId', getUserById);
// обновляет аватар пользователя
router.patch('/me/avatar', changeUserAvatar);
// редактирует данные пользователя
router.patch('/me', changeUserInfo);

module.exports = router;
