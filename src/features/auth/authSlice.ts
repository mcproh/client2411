// src/features/auth/authSlice.ts
// ---------------------------------------------------------
// СЛАЙС авторизации. Проверка логина/пароля по-прежнему идёт
// через AccountService (реального бэкенда для аккаунтов нет —
// поэтому это обычный, не асинхронный экшен, в отличие от
// fridgeSlice, который уже ходит на сервер).
// Текущий пользователь кладётся в localStorage, чтобы не
// разлогиниваться при обновлении страницы.
// ---------------------------------------------------------

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Account from '../../models/Account'
import type { RootState } from '../../app/store'

const STORAGE_KEY = 'fridgeCurrentUser'

function loadStoredUser(): Account | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Account
  } catch {
    return null
  }
}

interface AuthState {
  user: Account | null
}

const initialState: AuthState = {
  user: loadStoredUser(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Account>) => {
      state.user = action.payload
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})

export const { login, logout } = authSlice.actions
export const selectCurrentUser = (state: RootState) => state.auth.user
export default authSlice.reducer
