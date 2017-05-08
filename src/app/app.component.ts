import { Component } from '@angular/core';
import { Auth } from './auth.service';


@Component({
  selector: 'cui-root',
  templateUrl: './app.template.html',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Auth]
})

export class AppComponent {
  constructor(private auth: Auth) {}
};

