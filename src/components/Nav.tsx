// src/components/Nav.tsx
// ---------------------------------------------------------
// Навигация вверху страницы. Помимо ссылок между страницами
// показывает, авторизован ли пользователь: имя + кнопка
// "Выйти" либо ссылка на страницу входа.
// Раньше currentUser/onLogout приходили сюда пропсами из App.tsx,
// теперь Nav сам читает authSlice через useAppSelector и сам
// диспатчит logout — меньше прокидывания пропсов через дерево.
// ---------------------------------------------------------

import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout, selectCurrentUser } from '../features/auth/authSlice'
import Button from './ui/Button'

export default function Nav() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <nav>
      <Link to="/">Холодильник</Link>
      {' | '}
      <Link to="/register">Регистрация</Link>
      {' | '}
      {currentUser ? (
        <>
          Здравствуйте, {currentUser.name}{' '}
          <Button variant="secondary" type="button" onClick={() => dispatch(logout())}>
            Выйти
          </Button>
        </>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </nav>
  )
}
