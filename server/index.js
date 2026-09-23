// server/index.js
// ---------------------------------------------------------
// Это СЕРВЕР-ЗАГЛУШКА (mock backend) для проекта "Холодильник".
// Он не подключён к базе данных — все данные хранятся прямо
// в оперативной памяти процесса (в обычном массиве).
// После перезапуска сервера данные сбросятся к начальным.
//
// Задача этого файла — показать, как в будущем можно будет
// подключить настоящий бэкенд к таблице продуктов на фронтенде.
// Сейчас фронтенд (src/pages/HomePage.tsx) работает независимо
// от сервера и хранит свои данные локально в React state, поэтому
// сервер можно запускать отдельно и проверять его, например, через
// Postman/curl, не трогая интерфейс.
// ---------------------------------------------------------

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Разрешаем запросы с фронтенда (Vite dev-сервер обычно на 5173)
app.use(cors());
// Позволяет серверу читать JSON из тела запроса (req.body)
app.use(express.json());

// "База данных" холодильника — просто массив в памяти (заглушка).
// id, название, категория, количество, срок годности (дней).
let fridgeItems = [
  { id: 1, name: 'Молоко', category: 'Молочное', quantity: 1, daysLeft: 5 },
  { id: 2, name: 'Яйца', category: 'Молочное', quantity: 10, daysLeft: 14 },
  { id: 3, name: 'Помидоры', category: 'Овощи', quantity: 6, daysLeft: 4 },
];

// Простой корневой маршрут — чтобы проверить, что сервер жив
app.get('/', (req, res) => {
  res.send('Сервер-заглушка холодильника работает. Используйте /api/fridge-items');
});

// GET /api/fridge-items — получить весь список продуктов
app.get('/api/fridge-items', (req, res) => {
  res.json(fridgeItems);
});

// POST /api/fridge-items — добавить новый продукт (заглушка)
// Ожидает в теле запроса JSON вида:
// { "name": "...", "category": "...", "quantity": 2, "daysLeft": 7 }
app.post('/api/fridge-items', (req, res) => {
  const { name, category, quantity, daysLeft } = req.body || {};

  // Минимальная проверка, что название передано
  if (!name) {
    return res.status(400).json({ error: 'Поле "name" обязательно' });
  }

  const newItem = {
    id: Date.now(), // простой способ сгенерировать уникальный id
    name,
    category: category || 'Без категории',
    quantity: Number(quantity) || 0,
    daysLeft: Number(daysLeft) || 0,
  };

  fridgeItems.push(newItem);
  res.status(201).json(newItem);
});

// DELETE /api/fridge-items/:id — удалить продукт по id (заглушка)
app.delete('/api/fridge-items/:id', (req, res) => {
  const id = Number(req.params.id);
  const existed = fridgeItems.some((item) => item.id === id);

  fridgeItems = fridgeItems.filter((item) => item.id !== id);

  if (!existed) {
    return res.status(404).json({ error: 'Продукт с таким id не найден' });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Сервер-заглушка запущен: http://localhost:${PORT}`);
});
