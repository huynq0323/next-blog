import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080", {
      transports: ["websocket"], // ⚠️ bắt buộc nếu không muốn fallback sang polling
    }); // Cần cấu hình .env
  }
  return socket;
};
