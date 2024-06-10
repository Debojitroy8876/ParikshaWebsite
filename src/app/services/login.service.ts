import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './Helper.component';
import { Token } from '@angular/compiler';
import { Subject } from 'rxjs';
//import { LocalStorageService } from './LocalStorage.component';
//import { LocalStorage } from 'localstorage-polyfill';

//global['sessionStorage'] = sessionStorage;

//import { LocalStorageService } from './LocalStorage.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient,/*private localStorageService: LocalStorageService*/) { }

  //generate token
  public generateToken(loginData:any){
     return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  // current user : which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  // login user
  public loginUser(token:any){
    localStorage.setItem('token',token);
    //this.loginStatusSubject.next(true);
     return true;
  }

  /*public loginUser(token:any){
  
    if(sessionStorage!=undefined){
      sessionStorage.setItem('token',token)
    }else{
      console.log('session storage is not defined');
    }
  }*/

  // isLogin : user is login or not
  public  isLoggedIn(){
    let tokenStr= localStorage.getItem('token');
    //return !!tokenStr;
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  /*public isLoggedIn(){
    let tokenStr=sessionStorage.getItem('token');
    return !!tokenStr;
  }*/

  // logout : remove token local storage
  public logout(){
    //this.localStorageService.removeItem('token');
    //this.localStorageService.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //sessionStorage.removeItem('token');
   // sessionStorage.removeItem('user');
    return true;
  }
   
  // get token : dont have to call backendeverytime,call getToken function to access the token
   public getToken(){
    return localStorage.getItem('token');
     //return this.localStorageService.getItem("token");
     //return sessionStorage.getItem('token');
   }
  
   // set user details
   public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
    //this.localStorageService.setItem('user',JSON.stringify(user));
    //sessionStorage.setItem('user',JSON.stringify(user));
   }

   // get user details
   public getUser(){
    let userStr= localStorage.getItem('user');
   // let userStr=sessionStorage.getItem('user');
    //let userStr = this.localStorageService.getItem('user');
    if(userStr !=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
    
   }

   // get user role
   public getUserRole(){
    let user= this.getUser();
    return user.authorities[0].authority;
   }
   


}
