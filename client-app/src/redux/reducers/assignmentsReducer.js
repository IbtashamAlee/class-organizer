import { ActionTypes } from "../constants/actionTypes";
const initialState = {
    assignments: [],
};

export const setAssignmentstReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_ASSIGNMENTS:
            return { ...state, assignments: payload };
        default:
            return state;
    }
};
