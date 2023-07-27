const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/router');
const { errorHandler } = require('./middlewares/errorHandler');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// создание приложения
const app = express();

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.json());

app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(routes);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
