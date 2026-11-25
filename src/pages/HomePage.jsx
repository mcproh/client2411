// src/pages/HomePage.jsx
// ---------------------------------------------------------
// Главная страница: таблица продуктов в холодильнике. Логика
// та же, что была раньше прямо в App — просто теперь это
// отдельная страница роутера, а не единственный экран приложения.
// ---------------------------------------------------------

import { useState } from 'react'
import { fridgeItemService } from '../services/FridgeItemService'
import FridgeItemTable from '../components/FridgeItemTable'
import AddFridgeItemForm from '../components/AddFridgeItemForm'

export default function HomePage() {
  const [items, setItems] = useState(fridgeItemService.all())

  // Добавить новую запись через сервис и перечитать таблицу
  const handleAdd = (data) => {
    fridgeItemService.add(data)
    setItems(fridgeItemService.all())
  }

  // Удалить запись через сервис и перечитать таблицу
  const handleDelete = (id) => {
    fridgeItemService.delete(id)
    setItems(fridgeItemService.all())
  }

  return (
    <table border={1} cellPadding={6}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Срок годности, дн.</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <FridgeItemTable items={items} onDelete={handleDelete} />
        <AddFridgeItemForm onAdd={handleAdd} />
      </tbody>
    </table>
  )
}
