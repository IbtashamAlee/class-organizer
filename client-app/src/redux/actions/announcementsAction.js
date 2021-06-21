import { ActionTypes } from "../constants/actionTypes";

export const setAnnouncements = (announcements) => {
    return {
        type: ActionTypes.SET_ANNOUNCEMENTS,
        payload: announcements,
    };
};
