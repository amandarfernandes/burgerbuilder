import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuToggle from '../SideDrawer/MenuToggle/MenuToggle';

const Toolbar = props =>(
<header className={styles.Toolbar}>
  <MenuToggle onClick={props.onMenuClick} />
  <div className={styles.Logo}>
    <Logo />
  </div>
  <nav className={styles.DesktopOnly}>
    <NavigationItems isAuthenticated={props.isAuthenticated} />
  </nav>
</header>
);

export default Toolbar;

