import React, { Component } from 'react';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'; 
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { createField, validationCheck,getFormElements } from '../../formUtility';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/';
class ContactData extends Component { 

  state= {
    validForm:false,
    orderForm: {
      name:createField("input",
           {type:"text",placeholder:"Name"},
            null,{required:true}
            ),
      phone:createField("input",        
            {type:"number",placeholder:"7012345678"},
            null,{required:true}
            ),
      email:createField("input",
            {type:"email",placeholder:"Email address"},
             null,{required:true,isEmail:true}
             ),
      street:createField("input",
             {type:"text",placeholder:"Street"}),
      city:createField("input",
           {type:"text",placeholder:"City"}),
      zipCode:createField("input",
             {type:"text",placeholder:"Zip"},
              null,{required:true,minLength:5,maxLength:5}
              ),
      deliveryMethod:createField("select", 
                     {options:[
                      {value:'delivery', display: 'Delivery'},
                      {value:'pick up', display: 'Pick up'}
                      ]},
                      'delivery')
    }
  }

changeHandler=(e,id)=>{
  const {orderForm} = this.state;
  const updatedElement = {...orderForm[id]};
  
  updatedElement.value = e.target.value;
  updatedElement.touched=true;
  if (updatedElement.validation){
    updatedElement.valid = validationCheck(updatedElement.value,updatedElement.validation)}
  
  orderForm[id] = updatedElement;
  
  //check for valid form
  let validForm = true;
  for (let field in orderForm) {
    if (orderForm[field].validation)
      validForm = orderForm[field].valid && validForm;
    }

  this.setState({orderForm,validForm});

}

orderHandler = (e) =>{
  e.preventDefault();

  const {orderForm} = this.state; 
  const customer = {};
  for (let element in orderForm) {
    console.log(orderForm[element].value)
    customer[element] = orderForm[element].value;
  }
  const {ingredients, totalPrice} = this.props;
    
  const order = {
    ingredients,
    totalPrice:totalPrice.toFixed(2),
    customer
  };
    
  this.props.saveBurgerOrder(order);
  
}

render() {
  /*
  let formElements = [];
  for (let field in this.state.orderForm) {
    formElements = [ ...formElements,{
      id:field,
      config:this.state.orderForm[field]
    }];
  }
  */
  
  let formElements = getFormElements(this.state.orderForm);
  
  let form = (
    <form>
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
      <Button type="Success" 
        clicked={this.orderHandler} 
        disabled={!this.state.validForm}
      >
        Submit Order</Button>
    </form>
  );
  
  if (this.props.loading) {
    form = <Spinner />;
  }
  
  return(
  <div className={styles.ContactData}>
    <h4>Contact</h4>
    {form}
  </div>
  );
}

}

const mapStateToProps = state => ({
  ingredients:state.burger.ingredients,
  totalPrice:state.burger.totalPrice,
  loading:state.order.loading
});

const mapDispatchToProps = dispatch => ({
  saveBurgerOrder:(order)=>dispatch(actions.saveBurgerOrder(order))
});

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));