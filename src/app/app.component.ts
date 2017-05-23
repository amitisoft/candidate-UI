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
  profile:any;
  constructor(private auth: Auth,private router:Router) {
    var profile_text = localStorage.getItem('profile');
    if (profile_text) {
      this.profile = JSON.parse(profile_text);
    }
    this.auth.onProfileUpdated.subscribe(newProfile => {
      this.profile = newProfile;
    });
  }
  ngOnInit(){
  }
};

