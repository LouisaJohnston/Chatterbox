import {
  addReverseConvoToStore,
} from "./utils/reducerFunctions";

const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
const SET_CONVERSATION = "SET_CONVERSATION";

export const setActiveChat = (username) => {
  return {
    type: SET_ACTIVE_CHAT,
    username,
  };
};

export const setReverseMessages = (messages) => {
  return {
    type: SET_CONVERSATION,
    messages,
  }
}

// const reducer = (state = "", action) => {
//   switch (action.type) {
//     case SET_ACTIVE_CHAT: {
//       return action.username;
//     }
//     default:
//       return state;
//   }
// };
const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return action.username;
    }
    case SET_CONVERSATION: {
      console.log(action)
      return addReverseConvoToStore(action.messages);
    }
    default:
      return state;
  }
};

export default reducer;
