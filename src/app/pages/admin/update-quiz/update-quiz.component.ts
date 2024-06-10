import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@app/services/category.service';
import { QuizService } from '@app/services/quiz.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {
  
constructor(private _router:ActivatedRoute,
           private _quiz:QuizService,
           private _category:CategoryService,
           private router:Router) {}

  qId:any;
  quiz:any;
  categories:any;

  ngOnInit():void{

       this.qId= this._router.snapshot.params['qid'];
       //alert(this.qId);
       this._quiz.getQuiz(this.qId).subscribe(
        (data:any)=>{
          this.quiz=data;
          console.log(this.quiz);
        },
        (error)=>{
          console.log(error);
        }
       );
        
       this._category.categories().subscribe(
        (data:any)=>{
          this.categories=data;
        },
         (error)=>{
          alert('error in loading categories');
         }
       );


  }

  public updateData(){
    //alert('test');

    // required validation if slots are blank

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        alert('Quiz updated successfully !!');
      },
      (error)=>{
        alert('Error in updating !!');
        console.log(error);
      }
    );
  }
}
