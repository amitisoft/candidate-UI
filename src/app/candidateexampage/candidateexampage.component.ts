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
  selectedAnswers:Array<any> = [];
  currentQuestion =[];
  examEndTime:any;
  examRemainingTime:any;
  examEndTimeFromAPI:any;
  remainingMinutes:any;
  remainingSeconds:any;
  progress:any;
  userSelectedAnswer:boolean = false;
  bookingId:string;
  candidateId:string;
  category:string;
  paperType:string;

  constructor(private _httpService: CandidateExampageService,private auth:Auth,private router:Router) {

  }

    ngOnInit(){
      this.bookingId =  JSON.parse(localStorage.getItem('bookingId'));
      this.candidateId =  JSON.parse(localStorage.getItem('candidateId'));
      this.category =  JSON.parse(localStorage.getItem('category'));
      this.paperType =  JSON.parse(localStorage.getItem('paperType'));
      var currentQuestionObject = JSON.parse(localStorage.getItem('currentQuestionId'));
      if(currentQuestionObject){
        var questionId = currentQuestionObject.id;
      }
      if(questionId){
        this.getAPIQuestion(questionId);
      }else{
        this.getAPIQuestion(0);
      }
      let timer = Observable.timer(2000,1000);
      this.sub = timer.subscribe(t => this.tickerFunc(t));
    }
    tickerFunc(tick){
      var currentDateTime = new Date (),
      currentTime = new Date ( currentDateTime );
       this.examEndTime = this.examEndTimeFromAPI;
      var seconds = (this.examEndTime - currentTime.getTime() )/ 1000;
      this.ticks = 1;
      var date = new Date(null);
      date.setSeconds(seconds - this.ticks); // specify value for SECONDS here
      this.examRemainingTime = date.toISOString().substr(14, 5);
      this.remainingMinutes = date.toISOString().substr(14, 2);
      this.remainingSeconds = date.toISOString().substr(17, 2);
      if(this.router.url =='/startexam' && ( this.examRemainingTime == 0)  ){
        this.ngOnDestroy();
        this.router.navigate(['/results']);
      }
    }

    ngOnDestroy(){
      // unsubscribe here
      this.sub.unsubscribe();
      localStorage.setItem('currentQuestionId', JSON.stringify({id: null}));
      localStorage.setItem('bookingId', JSON.stringify(null));
      //localStorage.setItem('candidateId', JSON.stringify(null));
      localStorage.setItem('category', JSON.stringify(null));
      localStorage.setItem('paperType', JSON.stringify(null));
    }
    getAPIQuestion(qsNumber){
      this._httpService.getAPIQuestion(qsNumber,this.bookingId,this.candidateId,this.category,this.paperType).subscribe(
            data => {
                this.currentQuestion = data;
                this.examEndTimeFromAPI = data.endTime;
                this.progressBar(data.questionNo,data.totalNoOfQsnsPerQsnPaperId);
              }
        );
       localStorage.setItem('currentQuestionId', JSON.stringify({id: qsNumber}));
    }
    postAnswer(id,questionId,correctAns){
      if(this.selectedAnswers.length <=0){
        alert('Please select at least one answer');
        return false;
      }
      var submitAnswer = {
        bookingId: this.bookingId,
        questionId:questionId,
        candidateId:this.candidateId,
        candidateAns: this.selectedAnswers,
        correctAns:correctAns
      };
      var nextQuestionId = id;
      this._httpService.postThisAnswer(submitAnswer).subscribe(
        (response) => {
          if(response.status == 200){
            this.getAPIQuestion(nextQuestionId);
          }else{
            alert('Some internal error occured.Please contact HR');
            return false;
          }
        }
      );
    }
    getSelectedBox(selectedAns, chkBoxStatus){
      if(chkBoxStatus===true){
        this.selectedAnswers.push(selectedAns);
      }else{
        var selectedAnsIndex = this.selectedAnswers.indexOf(selectedAns);
        if(selectedAnsIndex !== -1){
          this.selectedAnswers.splice(selectedAnsIndex, 1);
        }
      }
      if(this.selectedAnswers.length>0){
        this.userSelectedAnswer =  true;
      }else{
        this.userSelectedAnswer =  false;
      }
    }
    progressBar(id,totalQuestions){
      var progressBar:number = (id-1);
      this.progress = (progressBar/totalQuestions)*100;
    }
    submitTest(id,questionId,correctAns){
      var submitLastAnswer = {
        bookingId: this.bookingId,
        questionId:questionId,
        candidateId:this.candidateId,
        candidateAns: this.selectedAnswers,
        correctAns:correctAns
      };
      this._httpService.postThisAnswer(submitLastAnswer).subscribe(
        (response)=>{
          if(response.status == 200){
            this.progress = 100;
            this.router.navigate(['/results']);
          }else{
            alert('Some internal error occured.Please contact HR');
            return false;
          }
        }
      );
    }
}
