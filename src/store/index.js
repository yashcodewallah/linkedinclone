import { legacy_createStore,applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from 'redux-thunk'
import rootReducer from "./reducers/reducerIndex";

const store=legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;