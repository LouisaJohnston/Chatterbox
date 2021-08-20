const GET_MESSAGES = "GET_MESSAGES";

export const gotMessages = (messages) => {
    return {
      type: GET_MESSAGES,
      messages,
    };
  };

  const reducer = (state = [], action) => {
      switch (action.type) {
        case GET_MESSAGES:
            return action.messages;
          default:
            return state;
      }
  }

  export default reducer;
  