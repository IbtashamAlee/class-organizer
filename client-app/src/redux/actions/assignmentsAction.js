import { ActionTypes } from "../constants/actionTypes";

export const setAssignments = (assignments) => {
    return {
        type: ActionTypes.SET_ASSIGNMENTS,
        payload: assignments,
    };
};
