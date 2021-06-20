import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./classReducer";
import { setProfileReducer } from "./profileReducer";
const reducers = combineReducers({
    user: productsReducer,
    product: selectedProductsReducer,
    profile: setProfileReducer
});
export default reducers;
