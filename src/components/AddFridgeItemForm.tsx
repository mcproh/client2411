// src/components/AddFridgeItemForm.tsx
// ---------------------------------------------------------
// Строка таблицы с полями ввода для добавления нового
// продукта. Хранит своё собственное состояние полей формы
// и наружу отдаёт только готовые данные через onAdd —
// сама ничего не знает про FridgeItemService.
// ---------------------------------------------------------

import { useState } from 'react'

interface AddFridgeItemFormProps {
  onAdd: (data: { name: string; quantity: number; daysLeft: number }) => void
}

export default function AddFridgeItemForm({ onAdd }: AddFridgeItemFormProps) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [daysLeft, setDaysLeft] = useState('')

  const handleSubmit = () => {
    if (!name) return // без названия строку не добавляем

    onAdd({
      name,
      quantity: Number(quantity) || 0,
      daysLeft: Number(daysLeft) || 0,
    })

    // Очищаем поля формы после добавления
    setName('')
    setQuantity('')
    setDaysLeft('')
  }

  return (
    <tr>
      <td></td>
      <td>
        <input
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="Количество"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="Срок годности, дн."
          value={daysLeft}
          onChange={(e) => setDaysLeft(e.target.value)}
        />
      </td>
      <td>
        <button type="button" onClick={handleSubmit}>
          Добавить
        </button>
      </td>
    </tr>
  )
}
