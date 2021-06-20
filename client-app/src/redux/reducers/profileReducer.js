import { ActionTypes } from "../constants/actionTypes";
const initialState = {
    profile: {},
};

export const setProfileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PROFILE:
            return { ...state, profile: payload };
        default:
            return state;
    }
};
