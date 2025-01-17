/*import { CanActivateFn } from '@angular/router';

export const normalGuard: CanActivateFn = (route, state) => {
  return true;
};*/
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Url } from 'url';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
 
@Injectable({
  providedIn: 'root',
})
export class NormalGuard implements CanActivate {

  constructor(private login:LoginService,private router:Router) {
  
  }

  canActivate(
    route :  ActivatedRouteSnapshot ,
    state :  RouterStateSnapshot
  ) : boolean 
  
        {
    // Guard logic here

    if(this.login.isLoggedIn() && this.login.getUserRole()=='NORMAL'){
      return true;
    }
     this.router.navigate(['/login']);
    
     return false;
     
        }
      
}
