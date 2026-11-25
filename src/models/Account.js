// src/models/Account.js
// ---------------------------------------------------------
// Класс-модель "Аккаунт пользователя". Описывает, какие данные
// хранятся про одного пользователя, авторизующегося в системе.
// ---------------------------------------------------------

export default class Account {
  constructor(login, password, name) {
    this.login = login
    this.password = password
    this.name = name
  }
}
