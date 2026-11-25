// src/app/hooks.ts
// ---------------------------------------------------------
// Типизированные версии useDispatch/useSelector — чтобы в
// компонентах не писать <RootState> и <AppDispatch> каждый раз.
// ---------------------------------------------------------

import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
