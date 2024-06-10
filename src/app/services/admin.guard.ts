//import { CanActivateFn } from '@angular/router';

//export const adminGuard: CanActivateFn = (route, state) => {

 // return true;
//};
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Url } from 'url';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
 
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private login:LoginService,private router:Router) {
  
  }

  canActivate(
    route :  ActivatedRouteSnapshot ,
    state :  RouterStateSnapshot
  ) : boolean 
  
        {
    // Guard logic here

    if(this.login.isLoggedIn() && this.login.getUserRole()=='ADMIN'){
      return true;
    }
     this.router.navigate(['/login']);
    
     return false;
     
        }
      
}
