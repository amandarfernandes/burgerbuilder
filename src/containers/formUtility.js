export const createField = (element,options,value,validation) =>{
  const field = {
    element:element,
    elemConfig:{
       ...options
    },
    touched:false,
    value: value?value:'',
    valid:true
  }
  
  if (validation) {
    field["valid"] = false;
    field["validation"] = {...validation}
  }
  //console.log(field)
  return field;
}

export const validationCheck=(value,rules)=>{
  let isValid=true;

  if (rules.required) {
      isValid=value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid=value.length >= rules.minLength && isValid;
  }
  
  if (rules.maxLength) {
    isValid=value.length <= rules.minLength && isValid;
  }
  
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid=pattern.test(value) && isValid;
  }
  
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid=pattern.test(value) && isValid;
  }
  
  return isValid;
}

export const getFormElements = (formObj) => {
  const formElements = [];
  for (let field in formObj) {
    formElements.push({
      id:field,
      config:formObj[field]
    });
  }
  return formElements;
}