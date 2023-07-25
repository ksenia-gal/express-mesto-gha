require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/router');
const { errorHandler } = require('./middlewares/errorHandler');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// создание приложения
const app = express();

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// // логгер запросов
// app.use(requestLogger);

app.use(routes);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
