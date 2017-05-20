import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';

@Component({
  selector: 'cui-candidateresults',
  templateUrl: './candidateresults.component.html',
  styleUrls: ['./candidateresults.component.css']
})
export class CandidateresultsComponent implements OnInit {

  constructor(private auth:Auth) { }

  ngOnInit() {
  }

}
