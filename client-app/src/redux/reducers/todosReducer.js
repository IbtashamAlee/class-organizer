import { ActionTypes } from "../constants/actionTypes";
const initialState = {
    todos: [],
};

export const setTodosReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_TODOS:
            return { ...state, todos: payload };
        default:
            return state;
    }
};
