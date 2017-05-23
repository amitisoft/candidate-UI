import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {CandidateExampageService} from './candidateexampage.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Auth } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cui-candidateexampage',
  templateUrl: './candidateexampage.component.html',
  styleUrls: ['./candidateexampage.component.css'],
  providers: [CandidateExampageService]
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
  remainingMinutes:any;
  remainingSeconds:any;
  progress:any;
  userSelectedAnswer:boolean = false;

//@HostListener('window:window:beforeunload', ['$event'])
// public beforeunload(event) {
//   localStorage.setItem('currentQuestionId', JSON.stringify({id: this.currentQuestion[0].id - 1}));
//   console.log('askjcgajkc');
// }

  constructor(private _httpService: CandidateExampageService,private auth:Auth,private router:Router) {
    this.getExamEndTime();
  }

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
      var seconds = (this.examEndTime.getTime() - currentTime.getTime() )/ 1000;
      this.ticks = 1;
      var date = new Date(null);
      date.setSeconds(seconds - this.ticks); // specify value for SECONDS here
      this.examRemainingTime = date.toISOString().substr(14, 5);
      this.remainingMinutes = date.toISOString().substr(14, 2);
      this.remainingSeconds = date.toISOString().substr(17, 2);
      if(this.router.url =='/startexam' && (!this.remainingMinutes && !this.remainingSeconds) ){
        this.ngOnDestroy();
        this.router.navigate(['/results']);
      }
    }

    ngOnDestroy(){
      // unsubscribe here
      this.sub.unsubscribe();
      localStorage.setItem('currentQuestionId', JSON.stringify({id: null}));
    }
    getQuestion(qsNumber){
      this.allQuestions = [];
      this._httpService.getNextQuestion().subscribe(
            data => {
                  for (let key in data) {
                      this.allQuestions.push(data[key]);
                  }
                  this.totalQuestions = this.allQuestions;
                  this.currentQuestion =  this.totalQuestions[qsNumber];
                  this.progressBar(this.currentQuestion[0].id);
                  this.selectedAnswers = [];
                  this.userSelectedAnswer =  false;
              }
        );
      localStorage.setItem('currentQuestionId', JSON.stringify({id: qsNumber}));
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
      if(this.selectedAnswers.length <=0){
        alert('Please select at least one answer');
        return false;
      }
      if(id >= this.totalQuestions.length){
        id = 0;
      }else{
        id = id;
      }
      this.rightAnswer.push({
        id: id,
        answers: this.selectedAnswers
      });
      this._httpService.postThisAnswer(this.rightAnswer).subscribe(
        () => {this.getQuestion(id)}
      );
      
      // if(id == 0 ){
      //   var progressBar:number =  this.totalQuestions.length;
      // }else{
      //   var progressBar:number = id;
      // }
      // this.progress = (progressBar/this.totalQuestions.length)*100;
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
      if(this.selectedAnswers.length>0){
        this.userSelectedAnswer =  true;
      }else{
        this.userSelectedAnswer =  false;
      }
    }
    progressBar(id){
      if( id == 0 ){
        var progressBar:number =  this.totalQuestions.length;
      }else{
        var progressBar:number = (id-1);
      }
      this.progress = (progressBar/this.totalQuestions.length)*100;
    }
    submitTest(){
      this.progress = 100;
      this.router.navigate(['/results']);
    }
}
