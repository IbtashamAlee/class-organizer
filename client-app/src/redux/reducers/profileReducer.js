import { ActionTypes } from "../constants/actionTypes";

export const setProfileReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PROFILE:
            return { ...state, ...payload };
        default:
            return state;
    }
};
