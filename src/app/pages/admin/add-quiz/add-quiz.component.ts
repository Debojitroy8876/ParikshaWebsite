import { Component , OnInit} from '@angular/core';
import { CategoryService } from '@app/services/category.service';
import { QuizService } from '@app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{
  
  categories=[
    {
      cid: '',
      title:''
    }
  ]
   QuizData={
    title : '',
    description : '',
    maxMarks : '',
    numberOfQuestions : '',
    active : true,
    category : {
      cid : '',
    }
   };


  constructor(private _categories:CategoryService,
              private _quiz:QuizService) {}

  ngOnInit(): void {
    this._categories.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },

      (error)=>{
        console.log(error);
        alert('Server error!!');
      }
    );
  }

  addQuiz(){
    //console.log(this.QuizData);
    if(this.QuizData.title.trim()=='' || this.QuizData.title.trim()==null){
      alert('Title required !!');
    
      return;
    }
   
    this._quiz.addQuiz(this.QuizData).subscribe(
      (data:any)=>{
        alert('Quiz added successfully');
        this.QuizData={
          title : '',
          description : '',
          maxMarks : '',
          numberOfQuestions : '',
          active : true,
          category : {
            cid : '',
          }
         };
      },

      (error)=>{
        alert('Server error !!');
        console.log(error);
      }

    )

  }
}
