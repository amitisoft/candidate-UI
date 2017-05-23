import { Injectable,EventEmitter  } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig } from './auth.config';
import { Router, NavigationStart  } from '@angular/router';
import 'rxjs/add/operator/filter';
import {GetCandidateTestStatusService} from './getcandidateteststatus.service';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {
    theme: {
      logo: 'test-icon.png',
      primaryColor: '#b81b1c'
    },
    languageDictionary: {
      title: 'My Company'
    }
  });

  profile:any;
  userExamStatus:any;
  onProfileUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(public router: Router,private getCandidateTestStatusService:GetCandidateTestStatusService) {
      this.getCandidateTestStatusService.getUserExamStatus().subscribe(
        data => {
          console.log(data);
          debugger;
          this.userExamStatus = data.testStatus;
            // for (let key in data) {
            //     this.userExamStatus = data[key][0].testStatus;
            //     break;
            // }
        }
      );
    this.lock.on("authenticated", (authResult: any) => {
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          throw new Error(error);
        }
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile)); // We will wrap the profile into a JSON object as In local Storage you can only store strings
        this.onProfileUpdated.emit(profile);
        debugger;
        if(this.userExamStatus == 'NotTaken'){
          this.router.navigate(['/inactivetestlink']);
        }else if(this.userExamStatus == 'progress'){
          this.router.navigate(['/conditions']);
        }else{
          this.logout();
          alert('Internal error.Please contact HR');
        }
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['']);
    this.userExamStatus = '';
  };
}
