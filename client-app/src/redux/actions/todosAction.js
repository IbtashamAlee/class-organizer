import { ActionTypes } from "../constants/actionTypes";

export const setTodos = (todos) => {
    return {
        type: ActionTypes.SET_TODOS,
        payload: todos,
    };
};
