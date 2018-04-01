import * as actionType from './actionTypes';
import axios from 'axios';


//import API_KEY from '../../../.env'
const API_KEY = "AIzaSyAgJUDRsIWbMZro5_zEFfzBgnjHk1ohFlc";
const URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
//const signupURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+API_KEY
//const signinURL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="+API_KEY

export const authRedirect=path=>({
  type:actionType.AUTH_SET_REDIRECT,
  path
})

const authStart=()=>({
  type:actionType.AUTH_START
});

export const logout=()=>{
  localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  return {
  type:actionType.AUTH_LOGOUT
}};

const authSuccess=(auth)=>({
  type:actionType.AUTH_SUCCESS,
  ...auth
})

const authFail=(error)=>({
  type:actionType.AUTH_FAIL,
  error
})

const authTimeout=expiresIn=>dispatch=>{
    console.log(expiresIn)
    setTimeout(()=>{
      dispatch(logout())
    },expiresIn*1000);
}

export const auth=(email,password,isSignup)=>dispatch=>{
   dispatch(authStart()); 
   const authData = {
      email,
      password,
      returnSecureToken:true
    }; 
    
    const url = `${URL}${isSignup? 'signupNewUser?key=':'verifyPassword?key='}${API_KEY}`;
    
    return axios.post(url, authData)
          .then(res=>{
            let expiresAt = new Date(new Date().getTime()+res.data.expiresIn*1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expiration',expiresAt);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess({token:res.data.idToken, userId: res.data.localId}));
            dispatch(authTimeout(res.data.expiresIn));      
          })
          .catch(err=>{dispatch(authFail(err.response.data.error))
                      })
}


export const authCheck = () => dispatch=>{
  //console.log('auth check')
  const token = localStorage.getItem('token');
  //console.log(token)
  if (!token) dispatch(logout());
  else {
    const expiration = new Date(localStorage.getItem('expiration'));
    if (expiration > new Date()) {
      const userId=localStorage.getItem('userId')
      dispatch(authSuccess({token,userId}));
      dispatch(authTimeout((expiration.getTime()-new Date().getTime())/1000));
    }
    else
      dispatch(logout())
  }
  
}