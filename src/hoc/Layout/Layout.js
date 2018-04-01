import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
  
  state = {
    showSideDrawer:false
  };
  
  sideDrawerCloseHandler=()=>{
    this.setState({showSideDrawer:false})
  }
  sideDrawerOpenHandler=()=>{
    this.setState(prevState=>(
        {showSideDrawer:!prevState.showSideDrawer}))
  }
  
  render() {
    return (
      <Aux>  
        <div> 
          <SideDrawer 
          auth={this.props.token}
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerCloseHandler}
          />
          <Toolbar isAuthenticated={this.props.isAuthenticated} onMenuClick={this.sideDrawerOpenHandler} />
        </div>  
        <main className={styles.Content}>
          {this.props.children}  
        </main>
      </Aux>  
    );
 }
}

const mapStateToProps = state=>({
    isAuthenticated: state.auth.token!==null
});

export default connect(mapStateToProps)(Layout);


