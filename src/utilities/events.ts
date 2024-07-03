export enum SocketIoEvents {
  CONNECT = 'connection',
  DISCONNECT = 'disconnect',
  CONNECT_ERROR = 'connect_error',
  CREATE_CHANNEL = 'create_channel',
  REMOVE_CHANNEL = 'remove_channel',
  JOIN_CHANNEL = 'join_channel',
  LEAVE_CHANNEL = 'leave_channel',
  SEND_MESSAGE = 'send_message',
  BROADCAST_MESSAGE = 'broadcast_message',
}

type MessagePayloadType = {
  message: string;
  socketId: string;
  messageId: string;
};

export type ServerToClientEvents = {
  [SocketIoEvents.BROADCAST_MESSAGE]: (payload: MessagePayloadType) => void;
  [SocketIoEvents.CONNECT_ERROR]: (error: { message: string }) => void;
};

export type ClientToServerEvents = {
  [SocketIoEvents.SEND_MESSAGE]: (payload: MessagePayloadType) => void;
};

/**
 * @description
 * this type is a placeholder as it has no use as of now
 * but it has to be passed while passing generics into server instance
 */
export type InterServerEvents = {
  ping: () => void;
};
