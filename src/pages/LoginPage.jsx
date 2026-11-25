// src/pages/LoginPage.jsx
// ---------------------------------------------------------
// Страница авторизации. Проверяет логин/пароль через
// AccountService. При успехе:
// 1) передаёт аккаунт наружу через onLogin (там его сохраняют
//    в state корневого компонента App);
// 2) переходит на страницу просмотра ("/") через useNavigate
//    из React Router.
// ---------------------------------------------------------

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { accountService } from '../services/AccountService'

export default function LoginPage({ onLogin }) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // useNavigate — хук React Router, позволяет перейти на другой
  // маршрут прямо из кода (не только по клику на Link)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const account = accountService.authenticate(login, password)

    if (!account) {
      setError('Неверный логин или пароль')
      return
    }

    setError('')
    onLogin(account)
    navigate('/') // переход на страницу просмотра (таблица продуктов)
  }

  return (
    <div>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин</label>
          <br />
          <input value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div>
          <label>Пароль</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}
