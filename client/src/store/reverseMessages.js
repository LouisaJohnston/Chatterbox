import {
    addReverseConvoToStore,
  } from "./utils/reducerFunctions";


  const SET_CONVERSATION = "SET_CONVERSATION";

export const setReverseMessages = (messages) => {
  return {
    type: SET_CONVERSATION,
    messages,
  }
}

const reducer = (state = [], action) => {
    switch (action.type) {
      case SET_CONVERSATION: {
        return addReverseConvoToStore(action.messages);
      }
      default:
        return state;
    }
  };
  
  export default reducer;