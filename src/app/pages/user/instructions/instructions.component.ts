import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '@app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit {
   
  qid:any;
  quiz:any;
  constructor(private _route:ActivatedRoute,
              private _quiz:QuizService,
              private router:Router
             ){}
  ngOnInit(): void {

    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid);

    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
         console.log(data);
         this.quiz=data;
      },
      (error)=>{
        console.log(error);
        alert('Error in loading quiz !!');
      }
    )
  }

  startQuiz(){
    const confirmation = window.confirm('Are you sure you want to START this quiz ?');
    if (confirmation) {
      this.router.navigate(['/start/'+ this.qid]);
    }
  }
}
