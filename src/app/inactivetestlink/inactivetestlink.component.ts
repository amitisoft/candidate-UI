import { Component, OnInit } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Auth } from '../auth.service';

@Component({
  selector: 'cui-inactivetestlink',
  templateUrl: './inactivetestlink.component.html',
  styleUrls: ['./inactivetestlink.component.css']
})
export class InactivetestlinkComponent implements OnInit {

  constructor(private auth:Auth) { }

  ngOnInit() {
  }

}
