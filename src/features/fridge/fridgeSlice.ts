// src/features/fridge/fridgeSlice.ts
// ---------------------------------------------------------
// СЛАЙС продуктов холодильника (Redux Toolkit "slice").
//
// Раньше HomePage работал с данными через FridgeItemService
// (в памяти, без сервера). Теперь — через АСИНХРОННЫЕ ЭКШЕНЫ
// (createAsyncThunk), которые реально обращаются к вашему
// серверу-заглушке server/index.js (http://localhost:3001).
//
// Каждый thunk сам создаёт 3 экшена: pending / fulfilled / rejected.
// По status === 'loading' показывается спиннер при первой загрузке,
// по mutating — спиннер при добавлении/удалении.
// ---------------------------------------------------------

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import FridgeItem from '../../models/FridgeItem'

const API_URL = 'http://localhost:3001/api/fridge-items'

// Данные для добавления новой записи — всё, кроме id (сервер генерирует сам)
type NewFridgeItemData = {
  name: string
  category: string
  quantity: number
  daysLeft: number
}

// ---------- АСИНХРОННЫЕ ЭКШЕНЫ (thunks) ----------

export const fetchFridgeItems = createAsyncThunk('fridge/fetchItems', async () => {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Не удалось загрузить продукты')
  return (await res.json()) as FridgeItem[]
})

export const addFridgeItem = createAsyncThunk(
  'fridge/addItem',
  async (data: NewFridgeItemData) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Не удалось добавить продукт')
    return (await res.json()) as FridgeItem
  },
)

export const deleteFridgeItem = createAsyncThunk(
  'fridge/deleteItem',
  async (id: number) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok && res.status !== 204) {
      throw new Error('Не удалось удалить продукт')
    }
    return id
  },
)

// ---------- СЛАЙС ----------

interface FridgeState {
  items: FridgeItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  mutating: boolean
  error: string | null
}

const initialState: FridgeState = {
  items: [],
  status: 'idle',
  mutating: false,
  error: null,
}

const fridgeSlice = createSlice({
  name: 'fridge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- fetchFridgeItems ---
      .addCase(fetchFridgeItems.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchFridgeItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchFridgeItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Не удалось загрузить продукты'
      })

      // --- addFridgeItem ---
      .addCase(addFridgeItem.pending, (state) => {
        state.mutating = true
      })
      .addCase(addFridgeItem.fulfilled, (state, action) => {
        state.mutating = false
        state.items.push(action.payload)
      })
      .addCase(addFridgeItem.rejected, (state, action) => {
        state.mutating = false
        state.error = action.error.message ?? 'Не удалось добавить продукт'
      })

      // --- deleteFridgeItem ---
      .addCase(deleteFridgeItem.pending, (state) => {
        state.mutating = true
      })
      .addCase(deleteFridgeItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.mutating = false
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
      .addCase(deleteFridgeItem.rejected, (state, action) => {
        state.mutating = false
        state.error = action.error.message ?? 'Не удалось удалить продукт'
      })
  },
})

export default fridgeSlice.reducer
