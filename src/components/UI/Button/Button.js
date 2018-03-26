import React from 'react';
import styles from './Button.module.css';

const Button = props =>(
  <button 
    onClick={props.clicked}
    disabled={props.disabled}
    className={[styles.Button, styles[props.type]].join(" ")}
  >
    {props.children}
  </button>
);

export default Button;