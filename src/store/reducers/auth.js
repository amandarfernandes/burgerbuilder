import * as actionType from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
  loading:false
};

const authStart = state => updateObject(state,{loading:true})
const authSuccess = (state,action) => updateObject(state,{loading:false})
const authFail = (state,action) => updateObject(state,{loading:false})                    
const reducer = (state,action) =>{

  switch (action.type) {
    case actionType.AUTH_START: return authStart(state)
    case actionType.AUTH_SUCESS: return authSuccess(state,action)     
    case actionType.AUTH_FAIL: return authFail(state,action)        
  }
}