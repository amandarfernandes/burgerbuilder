import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';


const checkoutSummary = props => {
  return  (
    <div className={styles.CheckoutSummary}>
      <h1>Thank you for ordering your burger from us.</h1>
      <div 
        style={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
          }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" 
        clicked={props.checkoutCancel}>
        CANCEL
      </Button>
      <Button type="Success" 
        clicked={props.checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;