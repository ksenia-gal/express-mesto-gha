// Подключение модуля маршрутизации Express
const router = require('express').Router();

// Подключение маршрутов для карточек
const cardRoutes = require('./cards');
// Подключение маршрутов для пользователей
const userRoutes = require('./users');

// Использование маршрутов для карточек по пути "/cards"
router.use('/cards', cardRoutes);
// Использование маршрутов для пользователей по пути "/users"
router.use('/users', userRoutes);

// Обработка запросов на несуществующие маршруты
router.use('/*', (req, res) => {
  res.status(404).send({ message: '404: Страница не найдена.' });
});

// Экспорт модуля маршрутизации
module.exports = router;
