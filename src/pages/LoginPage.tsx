// src/pages/LoginPage.tsx
// ---------------------------------------------------------
// Страница авторизации. Проверяет логин/пароль через
// AccountService (как и раньше — синхронно, своего бэкенда
// для аккаунтов нет). При успехе:
// 1) диспатчит login(account) — сохраняет пользователя в Redux
//    (authSlice) и в localStorage;
// 2) переходит на страницу просмотра ("/") через useNavigate.
//
// Форма собрана из переиспользуемых Input/Button — тех же
// компонентов, что используются в AddFridgeItemForm и RegisterPage.
// ---------------------------------------------------------

import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { accountService } from '../services/AccountService'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/auth/authSlice'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const [loginValue, setLoginValue] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const dispatch = useAppDispatch()
  // useNavigate — хук React Router, позволяет перейти на другой
  // маршрут прямо из кода (не только по клику на Link)
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const account = accountService.authenticate(loginValue, password)

    if (!account) {
      setError('Неверный логин или пароль')
      return
    }

    setError('')
    dispatch(login(account))
    navigate('/') // переход на страницу просмотра (таблица продуктов)
  }

  return (
    <div>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Логин"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
        />
        <Input
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        <Button type="submit">Войти</Button>
      </form>
    </div>
  )
}
