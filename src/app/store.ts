// src/app/store.ts
// ---------------------------------------------------------
// Сборка Redux-стора из слайсов (fridge + auth).
// ---------------------------------------------------------

import { configureStore } from '@reduxjs/toolkit'
import fridgeReducer from '../features/fridge/fridgeSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    fridge: fridgeReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
