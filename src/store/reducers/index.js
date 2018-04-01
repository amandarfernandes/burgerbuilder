import { combineReducers } from 'redux';
import burgerReducer from './burger.js';
import orderReducer from './order.js';
import authReducer from './auth.js';

const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer
});

export default rootReducer;

