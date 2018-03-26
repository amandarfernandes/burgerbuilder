import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

const orderSummary = 
      ({ingredients,orderContinue,orderCancel,price}) => {
        
  const ingredientSummary = Object.keys(ingredients)
    .map(ing=>(
      <li key={ing}>
        {ingredients[ing]}
        <span 
          style={{textTransorm:'capitalize'}}
        >
        {" "}{ing} 
        </span> 
      </li>
    ));
   
    return (
    <Aux>
       <h3>Your Order</h3>
       <p>A delicious burger made of </p>
       <ul>
         {ingredientSummary}
       </ul>
       <h4>Total price of burger is ${price.toFixed(2)}</h4>
       <p>Continue to checkout? </p>
       <Button 
         type="Danger"
         clicked={orderCancel}
       >
         CANCEL
       </Button>
       <Button
         type="Success"
         clicked={orderContinue}
       >
         CONTINUE
       </Button>
     </Aux>
    )
  }  
       
export default orderSummary;