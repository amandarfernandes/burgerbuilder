import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const SideDrawer = props=>{
  let className = [styles.SideDrawer, styles.Close]
  if (props.open) {
    className = [styles.SideDrawer, styles.Open]
  }
  return (
    <Aux>
    <Backdrop 
              show={props.open} 
              clicked={props.closed}/>
    
    <div className={className.join(" ")}>
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav>
      <NavigationItems />
    </nav>
  </div>
  </Aux>
  )
};

export default SideDrawer;