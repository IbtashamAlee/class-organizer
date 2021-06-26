import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./classReducer";
import { setProfileReducer } from "./profileReducer";
import {setAnnouncementReducer} from './announcementsReducer'
import {setTodosReducer} from './todosReducer';
import {setAssignmentstReducer} from './assignmentsReducer'

const reducers = combineReducers({
    user: productsReducer,
    product: selectedProductsReducer,
    profile: setProfileReducer,
    announcements: setAnnouncementReducer,
    todos: setTodosReducer,
    assignments: setAssignmentstReducer,
});
export default reducers;
