const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/router');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// создание приложения
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64afed73b4096ee42aca255e',
  };
  next();
});

app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  // если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
