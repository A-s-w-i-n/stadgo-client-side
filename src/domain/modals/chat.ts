export interface Chats {
  _id: string;
  chatname: string;
  User: string;
  Owner: string;
  latestMessage: latest;
}

export interface latest {
  chat: string;
  content: string;
}

export interface message {
  timestamp: string | number | Date;
  _id: string;
  User: string;
  Owner: string;
  content: string;
  chat: Chats;
  createdAt: string;
}
