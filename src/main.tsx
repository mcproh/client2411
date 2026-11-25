import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Provider даёт всему приложению доступ к Redux-стору (слайсы fridge + auth) */}
    <Provider store={store}>
      {/* BrowserRouter даёт всему приложению доступ к роутингу (Routes/Link) */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
