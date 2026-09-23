// src/components/FridgeItemTable.tsx
// ---------------------------------------------------------
// "Глупый" (презентационный) компонент: ничего не знает про
// сервис FridgeItemService, только рисует строки таблицы по
// переданному списку и вызывает onDelete при клике на кнопку.
// Вся логика (откуда взялись данные, как удалять) остаётся
// снаружи — в HomePage.tsx.
// ---------------------------------------------------------

import type FridgeItem from '../models/FridgeItem'

interface FridgeItemTableProps {
  items: FridgeItem[]
  onDelete: (id: number) => void
}

export default function FridgeItemTable({
  items,
  onDelete,
}: FridgeItemTableProps) {
  return (
    <>
      {items.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.daysLeft}</td>
          <td>
            <button type="button" onClick={() => onDelete(item.id)}>
              Удалить
            </button>
          </td>
        </tr>
      ))}
    </>
  )
}
