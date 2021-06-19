import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./profileReducer";
const reducers = combineReducers({
    user: productsReducer,
    product: selectedProductsReducer,
});
export default reducers;
