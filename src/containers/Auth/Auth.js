import React, {Component} from 'react';
import {createField, validationCheck, getFormElements} from '../formUtility';
import Button from '../../components/UI/Button/Button';
//import Spinner from '../../../components/UI/Spinner/Spinner'; 
import Input from '../../components/UI/Input/Input';

import styles from './Auth.module.css';
import * as actions from '../../store/actions/';
import {connect} from 'react-redux';

class Auth extends Component {
  state={
   validForm:false, 
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
    const {authForm} = this.state
    this.props.onAuth(authForm.email.value,authForm.password.value);
  }
    
    
    
  render() {
  
    let formElements=getFormElements(this.state.authForm);
    return (    
      <div className={styles.Auth}>
      <form onSubmit={this.onSubmitHandler}>
      {formElements.map(elem=>(
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
         />))
      }
      <Button 
        type="Success"
        disabled={!this.state.validForm}
      >
        Submit Order</Button>
    </form>
    </div>
  )
  
  }
}

const mapDispatchToProps=dispatch=>({
  onAuth:(email,password)=>dispatch(actions.auth(email,password))
});

export default connect(null,mapDispatchToProps)(Auth);