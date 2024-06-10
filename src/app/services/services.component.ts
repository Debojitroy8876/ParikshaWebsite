/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './Helper.component' ;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpClient) 
  { }
   // add user
  public addUser(users: any){

     console.log("data" ,baseUrl);
    return this.http.post('baseUrl/users/',users  );


  }


}*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './Helper.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  // add user
  public addUser(users: any){
    console.log("data", baseUrl);
    return this.http.post(`${baseUrl}/users/`, users);
  }
}
