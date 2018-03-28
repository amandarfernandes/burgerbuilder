import * as actionType from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (ingredient) => ({
          type:actionType.ADD_INGREDIENT,
          ingredient
});

export const removeIngredient = (ingredient) => ({
          type:actionType.REMOVE_INGREDIENT,
          ingredient
});

const setInitialIngredients=ingredients=>({
  type:actionType.SET_INITIALINGREDIENTS,
  ingredients
});

const fetchError =() =>({
  type:actionType.FETCH_ERROR
})

export const getInitialIngredients=() => dispatch => (
  axios.get('https://react-mandycodestoo-burger.firebaseio.com/ingredient.json')
      .then(response=>dispatch(setInitialIngredients(response.data)))
      .catch(error=>dispatch(fetchError()))
);