// src/components/FridgeItemTable.jsx
// ---------------------------------------------------------
// "Глупый" (презентационный) компонент: ничего не знает про
// сервис FridgeItemService, только рисует строки таблицы по
// переданному списку (items) и вызывает onDelete(id) при клике
// на кнопку. Вся логика (откуда взялись данные, как удалять)
// остаётся снаружи — в HomePage.jsx.
// ---------------------------------------------------------

export default function FridgeItemTable({ items, onDelete }) {
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
