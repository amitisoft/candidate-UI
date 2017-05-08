import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CandidateloginComponent } from './candidatelogin/candidatelogin.component';
import { CandidateconditionsComponent } from './candidateconditions/candidateconditions.component';
import { CandidateexampageComponent } from './candidateexampage/candidateexampage.component';
import { CandidateheaderComponent } from './candidateheader/candidateheader.component';

import { CandidateRoutingModule } from './candidate.routing.module';
import { HomeComponent } from './home.component';
import { Auth } from './auth.service';

// import { AUTH_PROVIDERS } from 'angular2-jwt';
import { routing, appRoutingProviders } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    CandidateloginComponent,
    CandidateconditionsComponent,
    CandidateexampageComponent,
    CandidateheaderComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CandidateRoutingModule, routing
  ],
 // providers: [AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
