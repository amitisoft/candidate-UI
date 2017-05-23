import { Component } from '@angular/core';
import { Auth } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'cui-root',
  templateUrl: './app.template.html',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Auth]
})

export class AppComponent {
  userName:string;
  constructor(private auth: Auth,private router:Router) {}
  ngOnInit(){
    if( JSON.parse(localStorage.getItem('profile')) ){
      this.userName = JSON.parse(localStorage.getItem('profile')).nickname;
    }
  }
};

