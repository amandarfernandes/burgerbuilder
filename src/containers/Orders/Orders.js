import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state={
    orders:[],
    loading:true
  }
  
  componentDidMount() {
    
   axios.get('/orders.json')
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
   })
  }

  render() {
      let orders='';
      
      if (this.state.loading) {
        orders= <Spinner />;
      } else {
        orders = this.state.orders.map(order=> <Order ingredients={order.ingredients} totalPrice={+order.totalPrice} key={order.id} />) ;
      }
    
     return (
       <div>
       {orders}   
       </div>
     )
  }
}

export default withErrorHandler(Orders,axios);