import io from 'socket.io-client';

export default function socketio(hash) {
  const socket = io(`${WARHOL_HOST}:${WARHOL_PORT}`, {
    query: {
      hash,
      sessionId: window.localStorage.getItem('sessionId'),
    },
  });
  return socket;
}
