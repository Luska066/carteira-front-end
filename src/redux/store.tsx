import {createStore} from "redux";
import rootReducer from './root-reducer.tsx';
const store = createStore(rootReducer)

export default store;