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
    this.props.fetchOrders();
    
   /*axios.get('/orders.json')
    .then(res=>{
     let fetchedOrders = [];
     //console.log(res.data)
     for (let key in res.data) {
       //console.log(res.data[key])
       fetchedOrders = [...fetchedOrders,
                       {...res.data[key],
                        id:key}
                      ];
     }
    // console.log(fetchedOrders)     
     this.setState({loading:false,orders:fetchedOrders});
    })
    .catch(err=>{
     console.log(err);
     this.setState({loading:false});
   })*/
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
  orders: state.order.orders
});

const mapDispatchToProps=dispatch=>({
  fetchOrders:()=>dispatch(actions.fetchOrders())
});
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));