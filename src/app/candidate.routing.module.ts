import { NgModule } from '@angular/core';
import { CandidateloginComponent } from './candidatelogin/candidatelogin.component';
import {CandidateconditionsComponent } from './candidateconditions/candidateconditions.component';
import {InactivetestlinkComponent } from './inactivetestlink/inactivetestlink.component';
import {CandidateexampageComponent } from './candidateexampage/candidateexampage.component';


import { Routes, RouterModule } from '@angular/router';

const candidateRoute: Routes = [

    { path: '', component: CandidateloginComponent },
   // { path: '', component: CandidateconditionsComponent },
    { path: 'conditions', component: CandidateconditionsComponent },
    { path: 'inactivetestlink', component: InactivetestlinkComponent },
    { path: 'startexam', component: CandidateexampageComponent },

];

@NgModule({


  imports: [RouterModule.forRoot(candidateRoute)],
  exports: [RouterModule]

})
export class CandidateRoutingModule { }
