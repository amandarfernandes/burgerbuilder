import React from 'react';
import styles from './Input.module.css';

const Input = props => {
  let inputElement=null;
  //console.log(props);
  const className = [styles.InputElement];
  
  if (props.invalid && props.touched && props.shouldValidate)   {
    className.push(styles.Invalid)
  }
  switch (props.elementType) {
    case ('input') :
      inputElement= (
        <input className={className.join(' ')} 
          {...props.elementConfig} 
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case ('textarea') :
      inputElement=(
        <textarea 
          className={className.join(' ')}
          {...props.elementConfig} 
          value={props.value}
          onChange={props.changed}
      />
      );
      break;
    case ('select'):
      inputElement= (
        <select
          className={className.join(' ')}
          onChange={props.changed}>
          value={props.value}
          {props.elementConfig.options.map((option, i)=>(
            <option key={option.display} 
              value={option.value} 
            >
              {option.display}
            </option>))
          }
        </select>
        );
      
      break;
    default:
      inputElement=(
        <input 
          className={className.join(' ')}
          {...props.elementConfig} 
          value={props.value} 
          onChange={props.changed}
        />
        );
  }
  let errorMessage = null;  
  if (props.invalid && props.touched && props.shouldValidate) {
    errorMessage=<p className={styles.Error}>Please enter a valid {props.name}</p>; 
  }
  return (
    <div className={styles.Input}>
      <label 
        className={styles.Label}>
        {props.label}
      </label>
      {inputElement}
      {errorMessage}
    </div>
  );

};


export default Input; 