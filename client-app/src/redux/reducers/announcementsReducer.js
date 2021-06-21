import { ActionTypes } from "../constants/actionTypes";
const initialState = {
    announcements: [],
};

export const setAnnouncementReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_ANNOUNCEMENTS:
            return { ...state, announcements: payload };
        default:
            return state;
    }
};
