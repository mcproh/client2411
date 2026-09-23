// src/models/FridgeItem.ts
// ---------------------------------------------------------
// Класс-модель "Продукт в холодильнике". Описывает форму одной
// записи в таблице холодильника. Это "чистые данные" — модель
// ничего не знает ни про React, ни про то, откуда она берётся
// (заглушка, сервер, что угодно).
// ---------------------------------------------------------

export default class FridgeItem {
  readonly id: number
  name: string
  quantity: number
  daysLeft: number

  constructor(id: number, name: string, quantity: number, daysLeft: number) {
    this.id = id
    this.name = name
    this.quantity = quantity
    this.daysLeft = daysLeft
  }
}
