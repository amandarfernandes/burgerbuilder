import React from 'react';
import styles from './BuildControl.module.css';


const buildControl = props => (
  <div className={styles.BuildControl}>
    
    <button className={styles.Less}
      onClick={props.removeIngredient}
      disabled={props.disabled}>
      <span aria-labelledby="jsx-a11y/accessible-emoji" role="img">➖</span>
    </button>
    <div className={styles.Label}>{props.label}</div>
    <button className={styles.More} 
      onClick={props.addIngredient}>
      <span aria-labelledby="jsx-a11y/accessible-emoji" role="img">➕</span>
    </button>
  </div>
)

export default buildControl;