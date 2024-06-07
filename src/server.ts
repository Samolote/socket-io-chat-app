import express from 'express';
import ViteExpress from 'vite-express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SOCKET_IO_EVENTS } from './SOCKET_IO_EVENTS';

const PORT = 4000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on(SOCKET_IO_EVENTS.CONNECT, (socket) => {
  console.log('a user connected: ' + socket.id);
  socket.on(SOCKET_IO_EVENTS.DISCONNECT, () => {
    console.log('user disconnected: ' + socket.id);
  });
});

httpServer.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

ViteExpress.bind(app, httpServer);
