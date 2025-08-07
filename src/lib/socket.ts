import { Socket, io } from "socket.io-client";

export interface ServerToClientEvents {
  success: (message: { message: string }) => void;
  error: (error: { message: string }) => void;
  realTime: (data: any) => void;
}

export interface ClientToServerEvents {
  joinAndGetData: (data: { deviceUniqueId: string }) => void;
}

export const createSocket = (
  token: string
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  return io(import.meta.env.VITE_APP_SOCKET_URL, {
    transports: ["websocket"],
    auth: {
      token: `Bearer ${token}`,
    },
    reconnectionAttempts: 5,
  });
};
