import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '@/utilities';

export type SocketData = {
  username: string;
};

const URL = 'http://localhost:8080';
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, { autoConnect: false });

export default socket;
