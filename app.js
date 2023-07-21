const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const { errors } = require('celebrate');
const routes = require('./routes/router');
// const errorsHandler = require('./middlewares/errorsHandler');
//const { requestLogger, errorLogger } = require('./middlewares/logger');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// создание приложения
const app = express();

app.use(helmet());

app.use(express.json());

// 8. Удалите хардкод
// app.use((req, res, next) => {
//   req.user = {
//     _id: '64afed73b4096ee42aca255e',
//   };
//   next();
// });

// // логгер запросов
// app.use(requestLogger);

app.use(routes);

// app.use(errors);

// app.use(errorsHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  // если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
