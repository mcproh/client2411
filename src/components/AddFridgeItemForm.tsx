// src/components/AddFridgeItemForm.tsx
// ---------------------------------------------------------
// Строка таблицы с полями ввода для добавления нового
// продукта. Хранит своё собственное состояние полей формы
// и наружу отдаёт только готовые данные через onAdd — сама
// ничего не знает про Redux/сервер, этим занимается HomePage.
//
// Использует те же переиспользуемые Input/Button, что и
// LoginPage/RegisterPage.
// ---------------------------------------------------------

import { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'

interface AddFridgeItemFormProps {
  onAdd: (data: {
    name: string
    category: string
    quantity: number
    daysLeft: number
  }) => void
}

export default function AddFridgeItemForm({ onAdd }: AddFridgeItemFormProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [daysLeft, setDaysLeft] = useState('')

  const handleSubmit = () => {
    if (!name) return // без названия строку не добавляем

    onAdd({
      name,
      category: category || 'Без категории',
      quantity: Number(quantity) || 0,
      daysLeft: Number(daysLeft) || 0,
    })

    // Очищаем поля формы после добавления
    setName('')
    setCategory('')
    setQuantity('')
    setDaysLeft('')
  }

  return (
    <tr>
      <td></td>
      <td>
        <Input
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <Input
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </td>
      <td>
        <Input
          type="number"
          placeholder="Количество"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </td>
      <td>
        <Input
          type="number"
          placeholder="Срок годности, дн."
          value={daysLeft}
          onChange={(e) => setDaysLeft(e.target.value)}
        />
      </td>
      <td>
        <Button type="button" onClick={handleSubmit}>
          Добавить
        </Button>
      </td>
    </tr>
  )
}
