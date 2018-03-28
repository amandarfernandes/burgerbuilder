import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from  '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/';


class BurgerBuilder extends Component {
  state={
    orderNow:false,
  }
  
  componentDidMount() {
    this.props.getInitialIngredients();
  }
  
  orderNowHandler=()=>{
    this.setState({orderNow:true});
  }

  orderCancelHandler=()=>{
    this.setState({orderNow:false});
  }
  
  orderContinueHandler=()=>{
    this.props.purchaseInit();
    this.props.history.push('/checkout');
  }
  
  canPurchase=()=>{
    const {ingredients} = this.props;
    const sum = Object.keys(ingredients)
                      .map(key=>ingredients[key])
                      .reduce((sum,el)=>sum+el,0)
    return sum > 0;    
  }

  render() {
    const {orderNow} = this.state;
    const {ingredients, totalPrice, addIngredient,removeIngredient} = this.props;
    
    let disabled = {};
    for(let key in ingredients) {
      disabled[key] = ingredients[key]<=0? true:false;
    }
  
    let orderSummary = null
    let burger = this.props.error? (
      <p>Error loading ingredients!</p>
    ):<Spinner />;
    
    if (ingredients) {
        burger =(
          <Aux>
            <Burger ingredients={ingredients} />
            <BuildControls 
              price={totalPrice}
              canPurchase={this.canPurchase()}
              order={this.orderNowHandler}
              onAdd={addIngredient} 
              onRemove={removeIngredient}  
              disabled={disabled}
            />
          {/*<Checkout />*/}
          </Aux>
        );
      
      orderSummary= <OrderSummary 
            price={totalPrice}
            orderCancel={this.orderCancelHandler}
            orderContinue={this.orderContinueHandler}
            ingredients={ingredients} 
          />;
    }
    
    //if (loading) {
    //    orderSummary = <Spinner />;
    //}
    return   (
      <Aux>
        <Modal show={orderNow} onModalClose={this.orderCancelHandler} >
          {orderSummary}
        </Modal>
      {burger}    
      </Aux>
    );
  }
  
}

const mapStateToProps = state =>(
  { 
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error:state.burger.error
  }
);

const mapDispatchToProps = dispatch =>({
  addIngredient   : (ingredient) => dispatch(actions.addIngredient(ingredient)),
  removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
  getInitialIngredients:()=>dispatch(actions.getInitialIngredients()),
  purchaseInit:()=>dispatch(actions.purchaseInit())
});
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));