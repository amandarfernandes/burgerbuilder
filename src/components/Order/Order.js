import React from 'react';
import styles from './Order.module.css';

const order = props => {
  let ingredients = [];
  for (let ing in props.ingredients) {
    ingredients = [...ingredients,
                   {name: ing, 
                    amount: props.ingredients[ing]
                    }
                  ]
  }
  const style={
    textTransform: 'capitalize',
    border: '1px solid #eee',
    display:'inline-block',
    padding: '5px',
    margin: '0 8px'
  }; 
  
  const ingList = ingredients.map(ing=><span key={ing.name} style={style}>{ing.name} ({ing.amount})</span>)
  return(
  <div className={styles.Order}>
    <p> Order Ingredients: {ingList}</p>
    <p>Total Price (USD): <strong>{props.totalPrice.toFixed(2)}</strong></p>
  </div>
  );
}

export default order;