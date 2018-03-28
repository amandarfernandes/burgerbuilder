import * as actionType from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  ingredients:null,
  totalPrice:4,
  error:false
}

const INGREDIENT_PRICES = {
  salad: 0.20,
  cheese: 0.50,
  bacon: 0.75,
  meat: 1.50
};

const addIngredient = (state,action)=>{
  const {ingredient} = action;
  const {ingredients,totalPrice} = state;
  const updatedIngredients = updateObject(ingredients, {[ingredient]:ingredients[ingredient]+1}); 
  const updatedProps = { 
    ingredients:updatedIngredients, 
    totalPrice:totalPrice+INGREDIENT_PRICES[ingredient],
  };
  
  return updateObject(state,updatedProps);
}

const removeIngredient = (state,action)=>{
  const {ingredient} = action;
  const {ingredients,totalPrice} = state;
  const updatedIngredients = updateObject(ingredients,{[ingredient]:ingredients[ingredient]-1});
  const updatedProps = { 
    ingredients:updatedIngredients, 
    totalPrice:totalPrice-INGREDIENT_PRICES[ingredient],
  };
      
  return updateObject(state,updatedProps) 
}

const setIngredients = (state,action) =>{
 return updateObject(state, {
          ingredients:{
            salad:action.ingredients.salad,
            bacon:action.ingredients.bacon,
            cheese:action.ingredients.cheese,
            meat:action.ingredients.meat,  
          },
          totalPrice:4,
          error:false
        });
}

const burgerReducer = (state=initialState,action) =>{

  switch (action.type) {
    case actionType.ADD_INGREDIENT:return addIngredient(state,action);
    case actionType.REMOVE_INGREDIENT: return removeIngredient(state,action);
    case actionType.SET_INITIALINGREDIENTS:  return setIngredients(state,action)
    case actionType.FETCH_ERROR: return updateObject(state,{error:true});
    default: return state;
  }

}
export default burgerReducer;
