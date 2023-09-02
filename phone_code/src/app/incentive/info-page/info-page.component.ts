import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/monitor/database.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent implements OnInit {

  constructor(private menuCtrl:MenuController,
    private appUsageDb: DatabaseService,
    private router: Router) { }

  ngOnInit() {
    this.menuCtrl.close();
  }

  ionViewDidEnter(){
    /*
    this.db.getDatabaseState().subscribe(rdy => {
     if (rdy) {     
       this.db.addTrack(this.pageTitle, "Enter", this.userProfileService.username, Object.keys(this.userProfileService.userProfile.survey_data.daily_survey).length); 
     }
    });
    */
    this.appUsageDb.saveAppUsageEnter("reward_info_page");  
  }  

  ionViewDidLeave(){
    /*
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {     
        this.db.addTrack(this.pageTitle, "Leave", this.userProfileService.username, Object.keys(this.userProfileService.userProfile.survey_data.daily_survey).length); 
      }
    });
    */ 
    this.appUsageDb.saveAppUsageExit("reward_info_page");     
  }

  openBaseline() {
    this.router.navigate(['baseline/tutorial']);
  }

}
