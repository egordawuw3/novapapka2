const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Обработка подключения пользователей
io.on('connection', (socket) => {
  console.log('Пользователь подключился');

  // Получение и рассылка сообщений
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Обработка отключения пользователя
  socket.on('disconnect', () => {
    console.log('Пользователь отключился');
  });
});

// Запуск сервера на порту 3000
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
