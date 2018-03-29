import * as actionType from './actionTypes';
import axios from 'axios';


//import API_KEY from '../../../.env'
//const API_KEY = "AIzaSyAgJUDRsIWbMZro5_zEFfzBgnjHk1ohFlc";
const URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAgJUDRsIWbMZro5_zEFfzBgnjHk1ohFlc'
const authStart=()=>({
  type:actionType.AUTH_START
});

const authSuccess=(auth)=>({
  type:actionType.AUTH_SUCCESS,
  auth
})

const authFail=(error)=>({
  type:actionType.AUTH_FAIL,
  error
})

export const auth=(email,password)=>dispatch=>{
  console.log(URL)
   dispatch(authStart()); 
    const authData = {
      email,
      password,
      returnSecureToken:true
    }
   return axios.post(URL,authData)
          .then(res=>dispatch(authSuccess(res.data)))
          .catch(err=>dispatch(authFail(err)))
}