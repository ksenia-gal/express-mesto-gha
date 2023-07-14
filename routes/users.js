const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  changeUserAvatar,
  changeUserInfo,
} = require('../controllers/users');

// возвращает всех пользователей из базы данных
router.get('/', getUsers);
// создает пользователя
router.post('/', createUser);
// возвращает пользователя по переданному _id
router.get('/:userId', getUserById);
// обновляет аватар пользователя
router.patch('/me/avatar', changeUserAvatar);
// редактирует данные пользователя
router.patch('/me', changeUserInfo);

module.exports = router;
