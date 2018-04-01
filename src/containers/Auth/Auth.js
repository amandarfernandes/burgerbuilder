import React, {Component} from 'react';
import {createField, validationCheck, getFormElements} from '../formUtility';
import {Redirect} from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import Input from '../../components/UI/Input/Input';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/';
import {connect} from 'react-redux';
//import axios from 'axios';

class Auth extends Component {
  state = {
   validForm:false, 
   isSignup:true, 
   authForm: {
      email:createField("input",
        {type:"email", placeholder:"Email"},
        null,
        {required:true,isEmail:true}
      ),
      password:createField("input",
        {type:"password", placeholder:"Password"},
        null,
        {required:true,minLength:7}
      )
    }
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath!=='/')
      this.props.onRootRedirect();
  }

  changeHandler=(e,id)=>{
    const {authForm} = this.state;
    const updatedElement = {...authForm[id]};
  
    updatedElement.value = e.target.value;
    updatedElement.touched=true;
    if (updatedElement.validation){
      updatedElement.valid = validationCheck(updatedElement.value,updatedElement.validation)
    }
    authForm[id] = updatedElement;
  
    //check for valid form
    let validForm = true;
    for (let field in authForm) {
      if (authForm[field].validation)
        validForm = authForm[field].valid && validForm;
    }

    this.setState({authForm,validForm});
}

  onSubmitHandler = (e) =>{
    e.preventDefault();
    const {authForm, isSignup} = this.state
    this.props.onAuth(authForm.email.value,authForm.password.value,isSignup);
    //this.props.history.push(this.props.authRedirectPath)
  }
    
  switchAuthHandler=()=>{
    //console.log(this.state.isS)
    this.setState(prevState=>({
      isSignup:!prevState.isSignup
    }))
  }  
    
  render() {
    let formElements=getFormElements(this.state.authForm);
    let form = formElements.map(elem=>(
        <Input 
          key={elem.id}
          elementType={elem.config.element} 
          elementConfig={elem.config.elemConfig}
          value={elem.config.value}
          invalid={!elem.config.valid}
          shouldValidate={elem.config.validation}
          touched={elem.config.touched}
          name={elem.id}        
          changed={(e)=>{this.changeHandler(e,elem.id)}}
         />
      ));

    if (this.props.loading) {
      form = <Spinner />
    }
    
    let errorMsg=null;
    if (this.props.error) {
      errorMsg=<p className={styles.Error}>{this.props.error.message.split("_").join(" ")}</p>
    }
    let title = <h2>Sign up</h2>
    if (!this.state.isSignup)
      title = <h2>Sign in</h2>
    return (    
    <div className={styles.Auth}>
      {this.props.isAuthenticated?<Redirect to={this.props.authRedirectPath} />:null}
      {title}
      {errorMsg}
      <form onSubmit={this.onSubmitHandler}>
        {form}
        <Button type="Success">SUBMIT</Button>
      </form>
      <Button 
        clicked={this.switchAuthHandler} 
        type="Danger">
        SWITCH TO {this.state.isSignup?' SIGN IN':' SIGN UP'}
      </Button>
    </div>
  )
  
  }
}

const mapStateToProps=state=>({
  loading:state.auth.loading,
  error:state.auth.error,
  isAuthenticated:state.auth.token != null,
  authRedirectPath:state.auth.authRedirectPath,
  buildingBurger:state.burger.building
});

const mapDispatchToProps=dispatch=>({
  onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
  onRootRedirect:()=>dispatch(actions.authRedirect("/"))
});

export default connect(mapStateToProps,mapDispatchToProps)(Auth);