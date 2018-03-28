import { combineReducers } from 'redux';
import burgerReducer from './burger.js';
import orderReducer from './order.js';


const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer
});

export default rootReducer;

