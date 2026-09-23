// src/pages/HomePage.tsx
// ---------------------------------------------------------
// Главная страница: таблица продуктов в холодильнике. Логика
// та же, что была раньше прямо в App.tsx — просто теперь это
// отдельная страница роутера, а не единственный экран приложения.
// ---------------------------------------------------------

import { useState } from 'react'
import { fridgeItemService } from '../services/FridgeItemService'
import type FridgeItem from '../models/FridgeItem'
import FridgeItemTable from '../components/FridgeItemTable'
import AddFridgeItemForm from '../components/AddFridgeItemForm'

export default function HomePage() {
  const [items, setItems] = useState<FridgeItem[]>(fridgeItemService.all())

  // Добавить новую запись через сервис и перечитать таблицу
  const handleAdd = (data: { name: string; quantity: number; daysLeft: number }) => {
    fridgeItemService.add(data)
    setItems(fridgeItemService.all())
  }

  // Удалить запись через сервис и перечитать таблицу
  const handleDelete = (id: number) => {
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
