import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '@app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit{

    catId:any;
    quizzes:any;

  constructor(private _route:ActivatedRoute,
              private _quiz:QuizService){}

  ngOnInit(): void {
    //this.catId=this._route.snapshot.params['catId'];
    // console.log(this.catId);

    this._route.params.subscribe((params)=>{
         this.catId = params['catId'];
         if(this.catId==0){
          console.log('Load all the quiz');
          this._quiz.getActiveQuizzes().subscribe(
            (data:any)=>{
              this.quizzes=data;
              console.log(this.quizzes);
            },
            (error)=>{
              console.log(error);
              alert('error in loading quiz');
            }
          )
        }else{
          console.log('load specific quiz');

          this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
            (data:any)=>{
              this.quizzes=data;
            },
            (error)=>{
              alert('Error in loading quiz !!');
            }
          )
        }
    });
    
  }
}
