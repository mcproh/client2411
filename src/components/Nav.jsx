// src/components/Nav.jsx
// ---------------------------------------------------------
// Навигация вверху страницы. Помимо ссылок между страницами
// показывает, авторизован ли пользователь: имя + кнопка
// "Выйти" либо ссылка на страницу входа.
// currentUser (аккаунт или null) передаётся сюда из App.jsx —
// сам Nav ничего не знает про то, откуда взялся пользователь.
// ---------------------------------------------------------

import { Link } from 'react-router-dom'

export default function Nav({ currentUser, onLogout }) {
  return (
    <nav>
      <Link to="/">Холодильник</Link>
      {' | '}
      <Link to="/register">Регистрация</Link>
      {' | '}
      {currentUser ? (
        <>
          Здравствуйте, {currentUser.name}{' '}
          <button type="button" onClick={onLogout}>
            Выйти
          </button>
        </>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </nav>
  )
}
