import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from  '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

//import Checkout from '../Checkout/Checkout';

const INGREDIENT_PRICES = {
  salad: 0.50,
  cheese: 0.75,
  bacon: 0.80,
  meat: 1.50
};

class BurgerBuilder extends Component {
  state = {
    ingredients :null,
    totalPrice:4.00,
    canPurchase:false,
    orderNow:false,
    loading:false,
    error:false
  }
  
  componentDidMount() {
    //console.log(this.props)
    axios.get('https://react-mandycodestoo-burger.firebaseio.com/ingredient.json')
      .then(response=>{
        this.setState({ingredients:response.data})
      })
      .catch(error=>{this.setState({error:true})});
  }
  
  orderNowHandler=()=>{
    this.setState({orderNow:true});
  }

  orderCancelHandler=()=>{
    this.setState({orderNow:false});
  }
  
  orderContinueHandler=()=>{
    const {ingredients,totalPrice} = this.state;
    const searchParams = [];
    
    for (let ingredient in ingredients) {
      searchParams.push(`${encodeURIComponent(ingredient)}=${encodeURIComponent(ingredients[ingredient])}`);
    }
    searchParams.push(`totalPrice=${totalPrice}`)
    this.props.history.push({
      pathname:'/checkout',
      search:'?'+searchParams.join('&')
    });
  }
  
  updateCanPurchase=()=>{
    const {ingredients} = this.state;
    const sum = Object.keys(ingredients)
                      .map(key=>ingredients[key])
                      .reduce((sum,el)=>sum+el,0)
    this.setState({canPurchase:sum > 0})    
  }

  addIngredientHandler = type=> {
      let { ingredients, totalPrice } = this.state;
      ingredients[type]++;
      totalPrice = totalPrice + INGREDIENT_PRICES[type];
      this.setState({ingredients:{...ingredients}, 
                     totalPrice
                    });
      this.updateCanPurchase();
  }
  
  removeIngredientHandler=type=> {
    let {ingredients, totalPrice} = this.state;
      if (ingredients[type] >0) {
        ingredients[type]--;
        totalPrice = totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients:{...ingredients}, 
                     totalPrice});
      }
     this.updateCanPurchase();
  }

  render() {
    const { loading, orderNow, canPurchase, ingredients, totalPrice } = this.state;
    
    let disabled = {};
    for(let key in ingredients) {
      disabled[key] = ingredients[key]<=0? true:false;
    }
  
    let orderSummary = null
    let burger = this.state.error? (
      <p>Error loading ingredients!</p>
    ):<Spinner />;
    
    if (ingredients) {
        burger =(
          <Aux>
            <Burger ingredients={ingredients} />
            <BuildControls 
              price={totalPrice}
              canPurchase={canPurchase}
              order={this.orderNowHandler}
              onAdd={this.addIngredientHandler} 
              onRemove={this.removeIngredientHandler}  
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
    
    if (loading) {
        orderSummary = <Spinner />;
    }
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

export default withErrorHandler(BurgerBuilder, axios);
