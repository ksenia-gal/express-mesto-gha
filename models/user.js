const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    // validate: {
    //   validator: (url) => validator.isLink(url),
    //   message: 'Неверный формат ссылки на изображение',
    // },
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
