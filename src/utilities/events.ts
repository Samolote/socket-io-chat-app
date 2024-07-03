export enum SocketIoEvents {
  CONNECT = 'connection',
  DISCONNECT = 'disconnect',
  CONNECT_ERROR = 'connectError',
  CREATE_CHANNEL = 'createChannel',
  REMOVE_CHANNEL = 'removeChannel',
  JOIN_CHANNEL = 'joinChannel',
  LEAVE_CHANNEL = 'leaveChannel',
  SEND_MESSAGE = 'sendMessage',
  BROADCAST_MESSAGE = 'broadcastMessage',
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
