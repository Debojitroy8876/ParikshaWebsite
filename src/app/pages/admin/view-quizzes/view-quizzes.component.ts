import { Component, OnInit } from '@angular/core';
import { QuizService } from '@app/services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {
 quizzes=[
  {
    qId: '',
    title : '',
    description : '',
    maxMarks : '',
    numberOfQuestions : '',
    active : '',
    category :{
                title: ''
              }
    }
    /*{
      qId: 2,
      title : 'Geography',
      description : 'It contains questions related to the physical geography of Asaam ',
      maxMarks : '100',
      numberOfQuestion : '20',
      active : '',
      category :{
                   title : 'Direct Recruitment'
                }
      },*/


 ]
 constructor(private _quiz:QuizService) {}
 ngOnInit(): void {
   this._quiz.quizzes().subscribe(
    (data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
    },
    (error)=>{
      console.log(error);
      alert('Error in loading data!!');
    }
   )
 }
  // DELETE QUIZ FUNCTION
  deleteQuiz(qId:any){
    const confirmation = confirm('Are you sure you want to delete this quiz?');
    if (confirmation) {
        this._quiz.deleteQuiz(qId).subscribe(
            (data: any) => {
                this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
                alert('Quiz deleted successfully');
            },
            (error) => {
                alert('Server error !!');
            }
        );
    }
  }

  
    /*return this._quiz.deleteQuiz(qId).subscribe(
      (data:any)=>{
        this.quizzes = this.quizzes.filter( (quiz) => quiz.qId != qId );
      alert('Quiz deleted successfully');
    },
    (error)=>{
      alert('Server error !!');
    }

    );*/
    
  



}
