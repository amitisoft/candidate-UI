import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'cui-candidatelogin',
  templateUrl: './candidatelogin.component.html',
  styleUrls: ['./candidatelogin.component.css']
})
export class CandidateloginComponent implements OnInit {
  
  token:any;
  constructor( private googleCondition: Router , private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.queryParams
      .subscribe(params => {
          this.token = params['token'];
    });
  	if(this.token){
  		localStorage.setItem('user_token', JSON.stringify(this.token));
  	}
  }

  onCandidateConditionGPage(){
    this.googleCondition.navigate(['../googleCondition'], { relativeTo: this.route });
  }

}
