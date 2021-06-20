import { ActionTypes } from "../constants/actionTypes";

export const setClasses = (classes) => {
    return {
        type: ActionTypes.SET_CLASS,
        payload: classes,
    };
};

export const selectedProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product,
    };
};
export const removeSelectedProduct = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_PRODUCT,
    };
};
