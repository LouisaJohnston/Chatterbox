const SET_TYPING_STATUS = "SET_TYPING_STATUS";

export const setTypingStatus = (id) => {
    return {
        type: SET_TYPING_STATUS,
        id,
    };
};

const reducer = (state = "", action) => {
    switch (action.type) {
        case SET_TYPING_STATUS: {
            return action.id;
        }
        default:
            return state;
    }
}

export default reducer