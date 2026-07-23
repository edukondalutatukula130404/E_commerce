import { io } from 'socket.io-client';

const getSocketUrl = () => {
  if (import.meta.env.VITE_SOCKET_URL) {
    return import.meta.env.VITE_SOCKET_URL;
  }
  const hostname = window.location.hostname || 'localhost';
  return `http://${hostname}:5000`;
};

const SOCKET_URL = getSocketUrl();

// Initialize singleton socket connection
export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000
});

socket.on('connect', () => {
  console.log('⚡ [Socket.io Client] Connected to real-time server:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('🔌 [Socket.io Client] Disconnected from server:', reason);
});

export const subscribeToEvent = (eventName, callback) => {
  socket.on(eventName, callback);
  return () => socket.off(eventName, callback);
};
