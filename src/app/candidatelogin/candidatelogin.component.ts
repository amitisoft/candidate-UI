import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'cui-candidatelogin',
  templateUrl: './candidatelogin.component.html',
  styleUrls: ['./candidatelogin.component.css']
})
export class CandidateloginComponent implements OnInit {

  constructor( private googleCondition: Router , private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onCandidateConditionGPage(){

    this.googleCondition.navigate(['../googleCondition'], { relativeTo: this.route });
  }

}
