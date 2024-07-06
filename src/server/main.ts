import express from 'express';
import ViteExpress from 'vite-express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import {
  SocketIoEvents,
  type ServerToClientEvents,
  type ClientToServerEvents,
  type InterServerEvents,
  type SocketData,
} from '@/utilities';

const PROTOCOL = 'http';
const URL = 'localhost';
const PORT = 8080;

const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  httpServer,
  {
    cors: {
      origin: `${PROTOCOL}://${URL}:${PORT}`,
    },
  },
);

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (typeof username !== 'string' || (typeof username === 'string' && username.length === 0)) {
    return next(new Error('invalid username'));
  }
  socket.data.username = username;
  next();
});

io.on(SocketIoEvents.CONNECT, (socket) => {
  console.log(`a user connected: ${socket.id}`);
  socket.on(SocketIoEvents.DISCONNECT, () => {
    console.log(`user disconnected: ${socket.id}`);
  });
  socket.on(SocketIoEvents.SEND_MESSAGE, (data) => {
    io.emit(SocketIoEvents.BROADCAST_MESSAGE, data);
  });
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
});

httpServer.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

ViteExpress.bind(app, httpServer);
