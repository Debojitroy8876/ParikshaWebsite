import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '@app/services/question.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrl: './view-questions.component.css'
})
export class ViewQuestionsComponent implements OnInit{
  
  qId:any;
  qTitle:any;
  question:any;
  
  constructor(private _route:ActivatedRoute,
             private _questuion:QuestionService
             ){}

 ngOnInit(): void {
   this.qId=this._route.snapshot.params['qid'];
   this.qTitle=this._route.snapshot.params['title'];
   this._questuion.getQuestuionsOfQuiz(this.qId).subscribe(
    (data:any)=>{
      console.log(data);
      this.question=data;
    },
    (error:any)=>{
      console.log(error);
      alert('Error in view question!!');
    }
   )
   //console.log(this.qId);
   //console.log(this.qTitle);
   }
   
   // delete question function
   deleteQuestion(qid:any){
      // alert(qid);
      const confirmation = confirm('Are you sure you want to delete this question?');
      if (confirmation) {
          this._questuion.deleteQuestion(qid).subscribe(
              (data: any) => {
                  this.question = this.question.filter((question: any) => question.qid != qid);
                  alert('Quiz deleted successfully');
              },
              (error) => {
                  alert('Server error !!');
              }
          );
      }
   }



}
