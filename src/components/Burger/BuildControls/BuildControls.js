import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl.js';

const controls = [
  {label: 'Salad', type:'salad'},
  {label: 'Meat', type:'meat'},
  {label: 'Cheese', type:'cheese'},
  {label: 'Bacon', type:'bacon'}
];
const buildControls = props=>(
  <div className={styles.BuildControls}>
    <h3>Cost of Burger: <span className={styles.Price}>${props.price.toFixed(2)}</span></h3>
    {controls.map(control=>(
      <BuildControl 
        key={control.type} 
        addIngredient={()=>props.onAdd(control.type)} 
        removeIngredient={()=>props.onRemove(control.type)}
        label={control.label} 
        disabled={props.disabled[control.type]}
      />
      )
    )}
    <button 
      className={styles.OrderButton}
      disabled={!props.canPurchase}
      onClick={props.order}
    > Order Now </button>
  </div>
);

export default buildControls;



