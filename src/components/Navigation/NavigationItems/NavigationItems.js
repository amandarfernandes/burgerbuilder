import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'


const NavigationItems = () =>(
<ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact >Burger Builder</NavigationItem>
    <NavigationItem link="/auth">Authenticate</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
</ul>
);


export default NavigationItems;