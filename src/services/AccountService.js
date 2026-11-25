// src/services/AccountService.js
// ---------------------------------------------------------
// Заглушка с данными об аккаунтах пользователей (по заданию —
// "объект с данными об аккаунтах"). Настоящего бэкенда и базы
// пользователей нет — список аккаунтов просто хранится в памяти.
//
// Оформлено классом по аналогии с FridgeItemService: список
// аккаунтов лежит в приватном поле, снаружи доступен только
// через метод authenticate.
// ---------------------------------------------------------

import Account from '../models/Account'

export default class AccountService {
  // #поле — настоящее приватное поле JavaScript (вместо TS-шного private)
  #accounts

  constructor(initial = []) {
    this.#accounts = initial
  }

  // Проверяет логин и пароль. Если совпадение найдено —
  // возвращает аккаунт, иначе undefined
  authenticate(login, password) {
    return this.#accounts.find(
      (account) => account.login === login && account.password === password,
    )
  }
}

// Единственный экземпляр сервиса с тестовыми аккаунтами
export const accountService = new AccountService([
  new Account('admin', 'admin123', 'Администратор'),
  new Account('user', 'user123', 'Пользователь'),
])
