import express from 'express';
import ViteExpress from 'vite-express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SocketIoEvents } from './events';

const PROTOCOL = 'http';
const URL = 'localhost';
const PORT = 8080;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `${PROTOCOL}://${URL}:${PORT}`,
  },
});

io.on(SocketIoEvents.CONNECT, (socket) => {
  console.log(`a user connected: ${socket.id}`);
  socket.on(SocketIoEvents.DISCONNECT, () => {
    console.log(`user disconnected: ${socket.id}`);
  });
  socket.on(SocketIoEvents.SEND_MESSAGE, (data) => {
    io.emit(SocketIoEvents.BROADCAST_MESSAGE, data);
  });
});

httpServer.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

ViteExpress.bind(app, httpServer);
