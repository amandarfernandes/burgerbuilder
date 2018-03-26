import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state={
    ingredients:{
      salad:1,
      meat:1,
      cheese:1,
      bacon:1
    },
    totalPrice:0
  }


  componentWillMount() {

    const searchParams = new URLSearchParams(this.props.location.search);
    const ingredients={};
    let totalPrice=0;
    
    for (let p of searchParams) {
      if (p[0]=== 'totalPrice') {
         totalPrice = +p[1]
      }
      else {
        ingredients[p[0]]= +p[1];
      }
    }
    this.setState({ingredients,totalPrice});
  }
  
checkoutCancelHandler=()=>{
      this.props.history.goBack();
  }
  
  checkoutContinueHandler=()=>{
     this.props.history.replace("/checkout/contact") ;
  }
  
  render() {
    const {ingredients} = this.state;
    //console.log(ingredients)
   return (<div>
     <CheckoutSummary 
     ingredients={ingredients}
     checkoutCancel={this.checkoutCancelHandler}
     checkoutContinue={this.checkoutContinueHandler} />
     <Route 
      path={`${this.props.match.path}/contact`} 
      render={props=>(
       <ContactData 
       ingredients={this.state.ingredients} 
       totalPrice = {this.state.totalPrice}    
       {...props}
       />)}
      />
     </div>
   ); 
  }

}

export default Checkout