import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';

@Component({
  selector: 'cui-candidateconditions',
  templateUrl: './candidateconditions.component.html',
  styleUrls: ['./candidateconditions.component.css'],
  providers: [Auth]
})
export class CandidateconditionsComponent implements OnInit {

    constructor(private auth: Auth) { }

  ngOnInit() {
  }

}
