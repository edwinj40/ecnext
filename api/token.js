 import { TOKEN } from "../utils/constants";
 import jwtDecode from "jwt-decode";

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

 export function getToken() {
   return localStorage.getItem(TOKEN);
 }

 export function removeToken() {
   localStorage.removeItem(TOKEN);
 }

 export function hasExpiredToken(token) {
   const tokenDecode = jwtDecode(token);
   const expireDate = tokenDecode.exp * 1000;
  //  fecha actual
   const currentDate = new Date().getTime();
   if (currentDate > expireDate) {
    //  expiro token
     return true;
   }
   return false;
 }