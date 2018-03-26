import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    let transformedIngredients = Object.keys(props.ingredients).map(ingKey=>{
                                     return[...Array(props.ingredients[ingKey])].map((_,i)=>(
                                      <BurgerIngredient type={ingKey} key={ingKey+i} />
                                      ));  
                                   })
                                    .reduce((arr,el)=>arr.concat(el),[]);
   //console.log(transformedIngredients)
   if (transformedIngredients.length <= 0) {
     transformedIngredients = <p>Please start adding ingredients</p> 
       }
  return (
    <div className={styles.Burger}>
    <BurgerIngredient type="bread-top" />
    {transformedIngredients}
    <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;