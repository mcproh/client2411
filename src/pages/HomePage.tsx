// src/pages/HomePage.tsx
// ---------------------------------------------------------
// Главная страница: таблица продуктов в холодильнике.
//
// Раньше данные брались из FridgeItemService (в памяти, без
// сервера) через useState. Теперь это "контейнерный" компонент,
// подключённый к Redux:
// - данные приходят через МЕМОИЗИРОВАННЫЙ селектор selectSortedFridgeItems;
// - загрузка/добавление/удаление — через АСИНХРОННЫЕ ЭКШЕНЫ
//   (fetchFridgeItems / addFridgeItem / deleteFridgeItem),
//   которые реально обращаются к server/index.js;
// - пока идёт запрос — показывается переиспользуемый Spinner.
// ---------------------------------------------------------

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchFridgeItems,
  addFridgeItem,
  deleteFridgeItem,
} from '../features/fridge/fridgeSlice'
import {
  selectSortedFridgeItems,
  selectFridgeStatus,
  selectFridgeMutating,
  selectExpiringSoonCount,
} from '../features/fridge/fridgeSelectors'
import FridgeItemTable from '../components/FridgeItemTable'
import AddFridgeItemForm from '../components/AddFridgeItemForm'
import Spinner from '../components/ui/Spinner'

export default function HomePage() {
  const dispatch = useAppDispatch()

  const items = useAppSelector(selectSortedFridgeItems)
  const status = useAppSelector(selectFridgeStatus)
  const mutating = useAppSelector(selectFridgeMutating)
  const expiringSoonCount = useAppSelector(selectExpiringSoonCount)

  // Загружаем продукты с сервера один раз при заходе на страницу
  useEffect(() => {
    dispatch(fetchFridgeItems())
  }, [dispatch])

  const handleAdd = (data: {
    name: string
    category: string
    quantity: number
    daysLeft: number
  }) => {
    dispatch(addFridgeItem(data))
  }

  const handleDelete = (id: number) => {
    dispatch(deleteFridgeItem(id))
  }

  return (
    <div>
      <h2>
        Продукты в холодильнике{' '}
        {expiringSoonCount > 0 && (
          <span className="badge">⚠ скоро истекают: {expiringSoonCount}</span>
        )}
      </h2>

      {status === 'loading' && <Spinner label="Загружаем продукты..." />}

      {status === 'failed' && (
        <p className="error">
          Не удалось загрузить данные. Убедитесь, что сервер запущен:{' '}
          <code>npm run server</code>
        </p>
      )}

      {status === 'succeeded' && (
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Категория</th>
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
      )}

      {mutating && <Spinner label="Сохраняем изменения..." />}
    </div>
  )
}
