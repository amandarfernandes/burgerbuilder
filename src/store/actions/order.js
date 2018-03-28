import * as  actionType from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (orderId,order) => ({
  type:actionType.PURCHASE_BURGER_SUCCESS,
  orderId,
  order
});

const purchaseBurgerFail = error => ({
  type:actionType.PURCHASE_BURGER_FAIL,
  error
});

const saveBurgerStart = ()=>({
  type:actionType.PURCHASE_BURGER_START
})

export const saveBurgerOrder = order =>dispatch=>{
   dispatch(saveBurgerStart());
  return axios.post('/orders.json', order)
  .then(res=>dispatch(purchaseBurgerSuccess(res.data.name,order)))
  .catch(err=>dispatch(purchaseBurgerFail(err)))
}

export const purchaseInit=()=>({
  type:actionType.PURCHASE_INIT
}) 

const fetchOrdersSuccess=orders=>({
  type:actionType.FETCH_ORDERS_SUCCESS,
  orders
});

const fetchOrdersFail=error=>({
  type:actionType.FETCH_ORDERS_FAIL,
  error
});

const fetchOrdersStart=()=>({
  type:actionType.FETCH_ORDERS_START
})

export const fetchOrders=()=>dispatch=>{
   dispatch(fetchOrdersStart());
  return axios.get('/orders.json')
  .then(res=>{
    const fetchedOrders = [];
    for (let orderName in res.data) {
      fetchedOrders.push({
        ...res.data[orderName],
        id:orderName
      });
    }
    dispatch(fetchOrdersSuccess(fetchedOrders))
  })
  .catch(err=>dispatch(fetchOrdersFail(err)))
}
