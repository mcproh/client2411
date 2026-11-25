// src/App.tsx
// ---------------------------------------------------------
// Корень приложения: навигация + маршруты.
// "/"          — таблица продуктов холодильника (HomePage)
// "/register"  — страница регистрации (RegisterPage)
// "/login"     — страница авторизации (LoginPage)
//
// Информация об авторизовавшемся пользователе раньше хранилась
// прямо здесь, в state корневого компонента, и передавалась вниз
// через пропсы. Теперь она в Redux (authSlice) — Nav и LoginPage
// читают/обновляют её напрямую через useAppSelector/useAppDispatch,
// пропсы для этого больше не нужны.
// ---------------------------------------------------------

import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
