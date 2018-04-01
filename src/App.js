import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
import Auth from  './containers/Auth/Auth';
import Logout from  './containers/Auth/Logout/Logout';
import * as actions from './store/actions/';
class App extends Component {
  componentDidMount() {
    this.props.authCheck();
  }
  
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />  
        <Route path="/auth" component={Auth} />  
      </Switch>
    );
    
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />  
          <Route path="/orders" component={Orders} />  
          <Route path="/auth" component={Auth} />  
          <Route path="/logout" component={Logout} />  
          <Route path="/checkout" component={Checkout} />  
        </Switch>
      );
    }
    
    return (
      <Layout>
      {routes}
      <Redirect to="/" />
      </Layout>
    );
  }
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.token !== null
  
});

const mapDispatchToProps = dispatch=>({
  authCheck:()=>dispatch(actions.authCheck())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
