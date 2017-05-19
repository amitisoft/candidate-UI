import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {getQuestionService} from '../getquestion.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Auth } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cui-candidateexampage',
  templateUrl: './candidateexampage.component.html',
  styleUrls: ['./candidateexampage.component.css'],
  providers: [getQuestionService]
})
export class CandidateexampageComponent implements OnInit,OnDestroy {
  ticks = 0;
  private timer;
  private sub: Subscription;
  getData:any;
  selectedAnswers:Array<any> = [];
  rightAnswer = [];
  allQuestions=[];
  totalQuestions=[];
  currentQuestion =[];
  result:any;
  examEndTime:any;
  examRemainingTime:any;
  examEndTimeFromAPI:any;

@HostListener('window:unload', ['$event'])
unloadHandler(event) {
  localStorage.setItem('currentQuestionId', JSON.stringify({id: this.currentQuestion[0].id - 1}));
}

  constructor(private _httpService: getQuestionService,private auth:Auth,private router:Router) { }

    ngOnInit(){
      this.getExamEndTime();
      var currentQuestionObject = JSON.parse(localStorage.getItem('currentQuestionId'));
      var questionId = currentQuestionObject.id;
      if(questionId){
        this.getQuestion(questionId);
        localStorage.setItem('currentQuestionId', JSON.stringify({id: null }));
      }else{
        this.getQuestion(0);
      }
      let timer = Observable.timer(2000,1000);
       this.sub = timer.subscribe(t => this.tickerFunc(t));
    }
    tickerFunc(tick){
      var currentDateTime = new Date (),
      currentTime = new Date ( currentDateTime );
      this.examEndTime = new Date (this.examEndTimeFromAPI);
      if(this.examEndTime !='Invalid Date'){
        this.examEndTime = this.examEndTime;
      }else{
        var currentDateTime = new Date (),
        finishedTime = new Date ( currentDateTime );
        finishedTime.setMinutes ( currentDateTime.getMinutes() + 30 );
        this.examEndTime = finishedTime;
      }
      var seconds = (this.examEndTime.getTime() - currentTime.getTime()) / 1000;
      this.ticks = tick;
      var date = new Date(null);
      date.setSeconds(seconds - this.ticks); // specify value for SECONDS here
      this.examRemainingTime = date.toISOString().substr(14, 5);
      if(this.router.url =='/startexam' && (seconds <= 0) ){
        this.ngOnDestroy();
        this.router.navigate(['/']);
      }
    }

    ngOnDestroy(){
      // unsubscribe here
      this.sub.unsubscribe();
    }
    getQuestion(qsNumber){
      this._httpService.getNextQuestion().subscribe(
            data => {
                  for (let key in data) {
                      this.allQuestions.push(data[key]);
                  }
                  this.totalQuestions = this.allQuestions;
                  this.currentQuestion =  this.totalQuestions[qsNumber];
              }
        );
    }
    getExamEndTime(){
       this._httpService.getTime().subscribe(
            data => {
                  for (let key in data) {
                       this.examEndTimeFromAPI = data[key].examFinishingTime;
                       break;
                  }
              }
        );
    }
    postAnswer(id){
      this.rightAnswer.push({
        id: id,
        answers: this.selectedAnswers
      });
      this._httpService.postThisAnswer(this.rightAnswer).subscribe(
        () => {this.getQuestion(id)}
      );
    }
    getSelectedBox(selectedAns, chkBoxStatus){
      if(chkBoxStatus===true){
        console.log(selectedAns);
        this.selectedAnswers.push(selectedAns);
        console.log(this.selectedAnswers);
      }else{
        var selectedAnsIndex = this.selectedAnswers.indexOf(selectedAns);
        if(selectedAnsIndex !== -1){
          this.selectedAnswers.splice(selectedAnsIndex, 1);
          console.log(this.selectedAnswers);
        }
      }
    }
}
