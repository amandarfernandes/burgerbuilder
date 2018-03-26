export const createField = (element,options,value,validation) =>{
  const field = {
    element:element,
    elemConfig:{
       ...options
    },
    touched:false,
    value: value?value:'',
  }
  
  if (validation) {
    field["valid"] = false;
    field["validation"] = {...validation}
  }
  //console.log(field)
  return field;
}