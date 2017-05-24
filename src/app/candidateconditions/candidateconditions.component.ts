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
    var bookingId = JSON.parse(localStorage.getItem('bookingId'));
    this.timeObject = {
      bookingId: bookingId,
      startingTime: new Date().getTime()
    };
    this.candidateConditionsService.postTime(this.timeObject).subscribe(
      (response) => {
        if(response.status == 200){
          this.router.navigate(['/startexam']);
        }else{
          alert('Some internal error occured.Please contact HR');
          return false;
        }
      }
    )
  }
}
