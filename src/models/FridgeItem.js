// src/models/FridgeItem.js
// ---------------------------------------------------------
// Класс-модель "Продукт в холодильнике". Описывает форму одной
// записи в таблице холодильника. Это "чистые данные" — модель
// ничего не знает ни про React, ни про то, откуда она берётся
// (заглушка, сервер, что угодно).
//
// Поля: id (число, не меняется), name, quantity, daysLeft.
// ---------------------------------------------------------

export default class FridgeItem {
  constructor(id, name, quantity, daysLeft) {
    this.id = id
    this.name = name
    this.quantity = quantity
    this.daysLeft = daysLeft
  }
}
