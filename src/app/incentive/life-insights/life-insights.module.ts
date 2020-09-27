
/* 
    The profile for questions is stored in /assets/data/life_insight.json
*/

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Q1MotivatedComponent } from './q1-motivated/q1-motivated.component';
import { SampleLifeInsightsComponent } from './sample-life-insights/sample-life-insights.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
    { path: 'sample-life-insights', component: SampleLifeInsightsComponent }
];

@NgModule({
  declarations: [Q1MotivatedComponent, SampleLifeInsightsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[Q1MotivatedComponent,SampleLifeInsightsComponent]
})
export class LifeInsightsModule { }
