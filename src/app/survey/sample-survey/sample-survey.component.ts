import { Component, OnInit } from '@angular/core';
//import { PreLoad } from '../../PreLoad';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { DatabaseService } from 'src/app/monitor/database.service';
import { UserProfileService } from 'src/app/user/user-profile/user-profile.service';

@Component({
  selector: 'app-sample-survey',
  templateUrl: './sample-survey.component.html',
  styleUrls: ['./sample-survey.component.scss'],
})

//@PreLoad('life-insights')
export class SampleSurveyComponent implements OnInit {
  pageTitle = "Survey_aya";

  constructor(private ga: GoogleAnalytics,
    private userProfileService: UserProfileService,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.ga.trackView('Survey_caregiver')
    .then(() => {console.log("trackView at Survey_caregiver!")})
    .catch(e => console.log('Error starting GoogleAnalytics == '+ e));

  }
  
  ionViewDidEnter(){
    this.db.getDatabaseState().subscribe(rdy => {
     if (rdy) {     
       this.db.addTrack(this.pageTitle, "Enter", this.userProfileService.username, Object.keys(this.userProfileService.userProfile.survey_data.daily_survey).length); 
     }
   }); 
 }  

 ionViewDidLeave(){
   console.log(this.pageTitle+": ionViewDidLeave");
   this.db.getDatabaseState().subscribe(rdy => {
     if (rdy) {     
       this.db.addTrack(this.pageTitle, "Leave", this.userProfileService.username, Object.keys(this.userProfileService.userProfile.survey_data.daily_survey).length); 
     }
   }); 
 }


}
