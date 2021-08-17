import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  setMarkedMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const token = window.localStorage.jwtToken;
const socket = io.connect(window.location.origin, {
  query: { token },
});

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });

  socket.on("message-marked", (message) => {
    store.dispatch(setMarkedMessage(message));
  });
});

export default socket;
