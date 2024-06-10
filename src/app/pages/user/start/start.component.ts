import { LocationStrategy } from '@angular/common';
import { Component ,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '@app/services/question.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit,OnDestroy {
   
  qid:any;
  questions:any;
  timer:any;
  // for tracking 
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;
  
   
  private popStateListener:any;
  
  constructor(private locationST:LocationStrategy,
              private _route:ActivatedRoute,
              private _question:QuestionService
              ){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    this.loadQuestions();
  }
  
  loadQuestions(){
    this._question.getQuestuionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        //console.log(data)
        this.questions=data;

        this.timer=this.questions.length * 0.9 * 60;

        this.questions.forEach((q:any)=>{
            
          q['givenAnswer']='';

        })
        console.log(this.questions);
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        alert('error in loading question!!');
      }
    )
  }


  ngOnDestroy(): void {
    // Clean up the popstate listener when the component is destroyed
    if (this.popStateListener) {
      this.popStateListener();
    }
  }

  preventBackButton():void{
    history.pushState(null,'',location.href);
    this.popStateListener = this.locationST.onPopState(()=>{
      history.pushState(null,'',location.href);
    });
  }


  submitQuiz(){
    const confirmation = window.confirm('Are you sure you want to SUBMIT thE quiz ?');
    if (confirmation) {
           this.evaluateQuiz();
          
    }
  }


  startTimer(){
   let time:any= window.setInterval(()=>{

      if(this.timer<=0){
        this.evaluateQuiz();
        clearInterval(time);
      }else{
        this.timer--;
      }
    },1000);
  }


  getFormattedtime(){
    let m =Math.floor(this.timer/60);
    let s =this.timer - m * 60;
    return `${m} min: ${s} sec`;
  }

  evaluateQuiz(){
    this.isSubmit=true;

    this.questions.forEach((q:any)=>{
          
        if(q.givenAnswer==q.answer){
          this.correctAnswers++;
          let marksOfOneQuestion=this.questions[0].quiz.maxMarks/this.questions.length;
          this.marksGot +=marksOfOneQuestion;
          
        }
        if(q.givenAnswer.trim() !=''){
          this.attempted++;
        }

    })

    //console.log( ' correct answers '+ this.correctAnswers);
    //console.log(' Marks got'+ this.marksGot);
    //console.log(' attempted'+ this.attempted);
  }


  // showAnswer() {
    //this.questions.forEach((q: any, index: number) => {
      //console.log(`Question ${index + 1}:`);
      //console.log(`Answer: ${q.answer}`);
      //console.log(`Given Answer: ${q.givenAnswer}`);
    //});
  //}

}
