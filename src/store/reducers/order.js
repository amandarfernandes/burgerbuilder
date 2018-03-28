import * as actionType from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  orders:[],
  loading:false,
  purchased:false
};

const purchaseInit = state => updateObject(state,{purchased:false})
const purchaseStart= state => updateObject(state,{loading:true})
const purchaseFail=state=>updateObject(state,{loading:false})
const purchaseSuccess=(state,action)=>{
    const newOrder=updateObject(action.order, {id:action.orderId});
    return updateObject(state,{
                loading:false,
                purchased:true,
                orders:state.orders.concat(newOrder)
    })
}

const fetchSuccess=(state,action)=>(
  updateObject(state,{orders:[...action.orders],loading:false})
)

const reducer = (state=initialState,action) => {
  switch (action.type) {
    case actionType.PURCHASE_INIT: return purchaseInit(state)
    case actionType.PURCHASE_BURGER_START: return purchaseStart(state)
    case actionType.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state,action);
    case actionType.PURCHASE_BURGER_FAIL: return purchaseFail(state);
    case actionType.FETCH_ORDERS_SUCCESS: return fetchSuccess(state,action);
    case actionType.FETCH_ORDERS_FAIL: return purchaseFail(state);
    case actionType.FETCH_ORDERS_START: return purchaseStart(state);
    default: return state;
  }
  
};

export default reducer;