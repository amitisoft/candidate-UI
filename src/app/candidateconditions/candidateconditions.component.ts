import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';
import { Router } from '@angular/router';
import {CandidateConditionsService} from './candidateconditions.service';

@Component({
  selector: 'cui-candidateconditions',
  templateUrl: './candidateconditions.component.html',
  styleUrls: ['./candidateconditions.component.css'],
  providers: [Auth,CandidateConditionsService]
})
export class CandidateconditionsComponent implements OnInit {
  timeObject:any;
  constructor(private auth: Auth,private router:Router,private candidateConditionsService:CandidateConditionsService) { }

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
    this.candidateConditionsService.postTime(this.timeObject).subscribe();
  }

}
