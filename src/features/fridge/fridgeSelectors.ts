// src/features/fridge/fridgeSelectors.ts
// ---------------------------------------------------------
// МЕМОИЗИРОВАННЫЕ СЕЛЕКТОРЫ (createSelector из Redux Toolkit,
// под капотом — reselect). Обычная функция-селектор пересчитывалась
// бы заново на каждый рендер; createSelector кэширует результат и
// пересчитывает его только когда реально изменился state.fridge.items.
// ---------------------------------------------------------

import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Простые (немемоизированные) селекторы — просто достают кусок state
export const selectFridgeItems = (state: RootState) => state.fridge.items
export const selectFridgeStatus = (state: RootState) => state.fridge.status
export const selectFridgeMutating = (state: RootState) => state.fridge.mutating
export const selectFridgeError = (state: RootState) => state.fridge.error

// Мемоизированный селектор: список, отсортированный по названию
export const selectSortedFridgeItems = createSelector(
  [selectFridgeItems],
  (items) => [...items].sort((a, b) => a.name.localeCompare(b.name, 'ru')),
)

// Мемоизированный селектор: продукты, у которых скоро истекает срок годности
export const selectExpiringSoonItems = createSelector([selectFridgeItems], (items) =>
  items.filter((item) => item.daysLeft <= 3),
)

// Селектор, собранный из другого мемоизированного селектора —
// показывает, что их можно комбинировать
export const selectExpiringSoonCount = createSelector(
  [selectExpiringSoonItems],
  (items) => items.length,
)
