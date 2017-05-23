import { Component, OnInit } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Auth } from '../auth.service';
import {GetCandidateTestStatusService} from '../getcandidateteststatus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cui-inactivetestlink',
  templateUrl: './inactivetestlink.component.html',
  styleUrls: ['./inactivetestlink.component.css'],
  providers:[GetCandidateTestStatusService]
})
export class InactivetestlinkComponent implements OnInit {
userExamStatus:any;
  constructor(private auth:Auth,private router:Router,private getCandidateTestStatusService:GetCandidateTestStatusService) { }

  ngOnInit() {
  	this.getCandidateTestStatusService.getUserExamStatus().subscribe(
        data => {
          	this.userExamStatus = data.testStatus;
          	if(this.userExamStatus == 'NotTaken'){
	          this.router.navigate(['/inactivetestlink']);
	       	}else if(this.userExamStatus == 'progress'){
	          this.router.navigate(['/conditions']);
	        }else{
	          this.auth.logout();
	          alert('Internal error.Please contact HR');
	        }
        }
    );
  }

}
