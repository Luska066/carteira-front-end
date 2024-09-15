import {createStore} from "redux";
//@ts-ignore
import rootReducer from './root-reducer';
const store = createStore(rootReducer)

export default store;