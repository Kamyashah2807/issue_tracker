import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { auth } from './reducers/auth';
import { message } from './reducers/message'

const middleware = [thunk];

const reducer = combineReducers({
  auth: auth,
  message: message,
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;