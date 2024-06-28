import express from 'express';
import ViteExpress from 'vite-express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import {
  SocketIoEvents,
  type ServerToClientEvents,
  type ClientToServerEvents,
  type InterServerEvents,
} from './events';
import { type SocketData } from './socket';

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
