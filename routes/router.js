const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');

// роуты, не требующие авторизации
// роут регистрации
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), createUser);
// роут для логина
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), login);

// авторизация
router.use(celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), auth);

// роуты, которым авторизация нужна
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;