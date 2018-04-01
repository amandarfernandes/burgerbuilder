import * as actionType from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState={
  loading:false,
  userId:null,
  token:null,
  error:null,
  authRedirectPath:"/"
};

const authStart = state => updateObject(state,{loading:true})
const authSuccess = (state,action) => updateObject(state,{loading:false,
                                                          userId:action.userId,
                                                          token: action.token,
                                                          error:null,
                                                         });
const authFail = (state,action) => updateObject(state,{loading:false,
                                                      userid:null,
                                                      token:null,
                                                      error:action.error})                    
const authLogout = state=>updateObject(state,initialState);
const authRedirect=(state,action)=>updateObject(state,{authRedirectPath:action.path});

const reducer = (state=initialState,action) =>{
  switch (action.type) {
    case actionType.AUTH_START: return authStart(state)
    case actionType.AUTH_SUCCESS: return authSuccess(state,action)     
    case actionType.AUTH_FAIL: return authFail(state,action)        
    case actionType.AUTH_LOGOUT: return authLogout(state)        
    case actionType.AUTH_SET_REDIRECT: return authRedirect(state,action)
    default: return state;
  }
}

export default reducer;