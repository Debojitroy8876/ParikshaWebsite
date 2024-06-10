import { Component, OnInit } from '@angular/core';
import { LoginService } from '@app/services/login.service';
import { LoginComponent } from '@app/pages/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
   // variable to trace
  isLoggdIn=false;
  user:any;
  
   constructor(public login:LoginService){

   }

  ngOnInit(): void {
    this.isLoggdIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) =>{
      this.isLoggdIn=this.login.isLoggedIn();
      this.user=this.login.getUser();
    })
  }

  public logout(){
    this.login.logout();
    //this.isLoggdIn=false;
    //this.user=null;
    window.location.reload();
  }
}
