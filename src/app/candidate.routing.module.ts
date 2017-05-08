import { NgModule } from '@angular/core';
import { CandidateloginComponent } from './candidatelogin/candidatelogin.component';
import {CandidateconditionsComponent } from './candidateconditions/candidateconditions.component';


import { Routes, RouterModule } from '@angular/router';

const candidateRoute: Routes = [

  {path: '', component: CandidateloginComponent , children: [
    {  path: 'googleCondition', component: CandidateconditionsComponent }
  ]}

];

@NgModule({


  imports: [RouterModule.forRoot(candidateRoute)],
  exports: [RouterModule]

})
export class CandidateRoutingModule { }
