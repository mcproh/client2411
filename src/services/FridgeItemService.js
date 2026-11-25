// src/services/FridgeItemService.js
// ---------------------------------------------------------
// Класс-заглушка "сервиса" продуктов холодильника. По сути это
// тот же подход, что и в заглушке препода (all/get/add/delete),
// только оформлено как класс:
//
// - список продуктов хранится в приватном поле (инкапсуляция),
//   снаружи класса напрямую его изменить нельзя — только
//   через методы all/get/add/delete;
// - вся логика работы с данными живёт в одном месте.
//
// Данные хранятся в памяти и сбрасываются при перезагрузке
// страницы — это по-прежнему заглушка, а не настоящий бэкенд.
// ---------------------------------------------------------

import FridgeItem from '../models/FridgeItem'

export default class FridgeItemService {
  // #поле — доступно только внутри класса, снаружи это поле не видно
  #items

  constructor(initial = []) {
    this.#items = initial
  }

  // Вернуть весь список продуктов
  all() {
    return this.#items
  }

  // Найти один продукт по id
  get(id) {
    return this.#items.find((item) => item.id === id)
  }

  // Добавить новый продукт. data = { name, quantity, daysLeft },
  // id генерируется автоматически
  add(data) {
    const newItem = new FridgeItem(
      this.#nextId(),
      data.name,
      data.quantity,
      data.daysLeft,
    )
    this.#items = [...this.#items, newItem]
    return newItem
  }

  // Удалить продукт по id. Возвращает true, если запись была найдена и удалена
  delete(id) {
    const lengthBefore = this.#items.length
    this.#items = this.#items.filter((item) => item.id !== id)
    return this.#items.length !== lengthBefore
  }

  // Приватный метод — вычисляет следующий свободный id.
  // Используется только внутри класса, поэтому скрыт от внешнего кода.
  #nextId() {
    const lastId = this.#items.reduce(
      (maxId, item) => Math.max(maxId, item.id),
      0,
    )
    return lastId + 1
  }
}

// Единственный экземпляр сервиса с начальными данными.
// Импортируется в компонентах вместо создания нового сервиса каждый раз,
// поэтому все части приложения работают с одними и теми же данными.
export const fridgeItemService = new FridgeItemService([
  new FridgeItem(1, 'Молоко', 1, 5),
  new FridgeItem(2, 'Яйца', 10, 14),
  new FridgeItem(3, 'Сыр', 1, 20),
  new FridgeItem(4, 'Помидоры', 6, 4),
])
