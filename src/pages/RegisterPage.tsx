// src/pages/RegisterPage.tsx
// ---------------------------------------------------------
// Простая страница регистрации. Реального сохранения данных
// нет (нет ни бэкенда, ни базы пользователей) — форма только
// собирает значения полей и выводит их в консоль.
//
// Собрана из тех же переиспользуемых Input/Button, что и
// LoginPage/AddFridgeItemForm — наглядный пример использования
// одних и тех же компонентов на разных формах.
// ---------------------------------------------------------

import { useState } from 'react'
import type { FormEvent } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Заглушка: реальной отправки на сервер пока нет
    console.log('Регистрация:', { name, email, password })
  }

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Имя" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </div>
  )
}
