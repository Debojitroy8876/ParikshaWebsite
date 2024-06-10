import { Component } from '@angular/core';
import { UserService } from '../../services/services.component';
import { subscribe } from 'diagnostics_channel';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
   constructor(private userService:UserService,
               /*private snack: MatSnackBar*/

   ){


   }
     public users={

        username: '',
        password: '',
        firstName:'',
        lastName:'',
        email:'',
        phone:''




     };

   FormSubmit(){
      console.log(this.users);
       if(this.users.username=='' || this.users.username==null){
           alert('username is required');

           /*this.snack.open('Username is required!!' ,'',
           {  duration:4000,
              //verticalPosition: 'top',
              //horizontalPosition: 'right'

           });*/
           return;
       }
      
       this.userService.addUser(this.users).subscribe(

           
            /*{
              next:data=>{console.log(data),
                alert ("successfull");
              },
             error:error=>alert("something went wrong"),
             
             
           }*/


          (data) =>{
            // succes call
            console.log(data);
            alert('succesfull registration!!!');
          } ,
          
            (error)=>{
               // error call
               console.log(error);
               alert('something went wrong');

            }
          
         
       )

   }


}
