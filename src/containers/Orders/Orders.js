import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class Orders extends Component {
  /*state={
    orders:[],
    loading:true
  }*/
  
  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  render() {
      const {orders,loading} = this.props
      let allOrders='';
      
      if (loading) {
        allOrders= <Spinner />;
      } else {
        allOrders = orders.map(order=> <Order ingredients={order.ingredients} totalPrice={+order.totalPrice} key={order.id} />) ;
      }
    
     return (
       <div>
       {allOrders}   
       </div>
     )
  }
}

const mapStateToProps=state=>({
  loading: state.order.loading,
  orders: state.order.orders,
  token:state.auth.token
});

const mapDispatchToProps=dispatch=>({
  fetchOrders:(token)=>dispatch(actions.fetchOrders(token))
});
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));