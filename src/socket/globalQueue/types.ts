export type GlobalQueueMessage = {
  topic: string;
  msg: string;
};

export type _GlobalQueueMessage = {
  GQM_ID: string;
} & GlobalQueueMessage;

export type GlobalQueueMessages = Required<_GlobalQueueMessage>[];

export type GetAllUsersType = {
  roomName: string;
} & _GlobalQueueMessage;

