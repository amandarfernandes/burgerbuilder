import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from'react-redux';

class Checkout extends Component {
  
  checkoutCancelHandler=()=>{
      this.props.history.goBack();
  }
  
  checkoutContinueHandler=()=>{
    this.props.history.replace("/checkout/contact") ;
  }
  
  render() {
    const {ingredients} = this.props;
    //console.log(ingredients)
    let  summary= <Redirect to="/" />
    if (ingredients) {
      const purchaseRedirect= this.props.purchased ? <Redirect to="/" />:null;
      summary = (
         <div>
          {purchaseRedirect}
           <CheckoutSummary 
             ingredients={ingredients}
             checkoutCancel={this.checkoutCancelHandler}
             checkoutContinue={this.checkoutContinueHandler} />
           <Route 
              path={`${this.props.match.path}/contact`} 
              component={ContactData}
          />
         </div>
      );
    }
   return  summary;
  }

}

const mapStateToProps = state =>({
  ingredients:state.burger.ingredients,
  purchased:state.order.purchased
})

export default connect(mapStateToProps)(Checkout);