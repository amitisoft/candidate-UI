import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';
import { CandidateResultsService } from './candidateresults.service';

@Component({
  selector: 'cui-candidateresults',
  templateUrl: './candidateresults.component.html',
  styleUrls: ['./candidateresults.component.css'],
  providers:[CandidateResultsService]
})
export class CandidateresultsComponent implements OnInit {
  candidateId:any;
  constructor(private auth:Auth,private resultsService:CandidateResultsService) { }

  ngOnInit() {
  	this.candidateId =  JSON.parse(localStorage.getItem('candidateId'));
  	// currently we are not displaying the score card

  	// this.resultsService.getCandidateResults(this.candidateId).subscribe(
  	// 	(data) =>{
  	// 		console.log(data);
  	// 	}
  	// );
  }

}
