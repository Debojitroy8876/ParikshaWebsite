import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '@app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

    loginData={
      username :'',
      password :''
    };

    constructor( private login:LoginService,private router:Router){}

  ngOnInit(): void {
    
  }
  formSubmit(){
  if(!this.loginData.username || this.loginData.username.trim() === ''){

      alert('username is required');
      /*this.snack.open("Username is required !!",'',{
        duration:3000
      })*/
      return;
    }
    if(!this.loginData.password || this.loginData.password.trim() === ''){

      alert('password is required');
      /*this.snack.open("Username is required !!",'',{
        duration:3000
      })*/
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      
      (data:any) =>{
        // succes call
        console.log('success');
        console.log(data);
        //alert('succesfull registration!!!');

        // Login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
           (user:any)=>{
                  this.login.setUser(user);
                  console.log(user);

                  // redirect --> ADMIN : Admin dashboard
                  // redirect --> NORMAL : Normal dashboard

                  if(this.login.getUserRole()=='ADMIN'){
                    // admin dashboard
                    //window.location.href = '/admin';
                    this.router.navigate(['admin']);
                    this.login.loginStatusSubject.next(true);
                  }else if(this.login.getUserRole()=='NORMAL'){
                    // user dashboard
                    //window.location.href = '/user-dashboard';
                    this.router.navigate(['user-dashboard/0']);
                    this.login.loginStatusSubject.next(true);
                  }else{
                    this.login.logout();
                  }
                }
              )              
            } ,
           (error:any)=>{
           // error call
           console.log('error');
           console.log(error);
           alert('Invalid credentials !! ');
         }
      )
    }
}
