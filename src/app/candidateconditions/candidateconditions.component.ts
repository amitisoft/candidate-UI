import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';
import { Router } from '@angular/router';
import {getQuestionService} from '../getquestion.service';

@Component({
  selector: 'cui-candidateconditions',
  templateUrl: './candidateconditions.component.html',
  styleUrls: ['./candidateconditions.component.css'],
  providers: [Auth,getQuestionService]
})
export class CandidateconditionsComponent implements OnInit {
  timeObject:any;
  constructor(private auth: Auth,private router:Router,private getQuestion:getQuestionService) { }

  ngOnInit() {
  }

  startExam(){
  	this.router.navigate(['/startexam']);
    var currentDateTime = new Date (),
    finishedTime = new Date ( currentDateTime );
    finishedTime.setMinutes ( currentDateTime.getMinutes() + 30 );
    this.timeObject = {
      examStartingTime: currentDateTime,
      examFinishingTime: finishedTime
    };
    this.getQuestion.postTime(this.timeObject).subscribe();
  }

}
