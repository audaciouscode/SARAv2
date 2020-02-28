import { Component, ViewChild, OnInit } from '@angular/core';
import { DemoAquariumComponent } from '../incentive/aquarium/demo-aquarium/demo-aquarium.component';
import { Platform, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/monitor/database.service';
import { AwsS3Service } from '../storage/aws-s3.service';
import { UserProfileService } from 'src/app/user/user-profile/user-profile.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

//@PreLoad('aquarium')
export class HomePage implements OnInit {

  private sub1$:any;
  private sub2$:any;
  money = 0;
  pageTitle = "Home";

  @ViewChild(DemoAquariumComponent, {static: true}) child;

  get isActive(){
    if(this.userProfileService == undefined)
      return true;
    else
      return this.userProfileService.isActive;
  }

  startCheatPage(){
    //this.router.navigate(['incentive/tundra']);
    this.router.navigate(['incentive/cheatpoints']);
  }

  constructor(private platform: Platform, private alertCtrl: AlertController, 
    private router: Router, 
    private userProfileService: UserProfileService,
    private db: DatabaseService,
    private awsS3Service: AwsS3Service
    ) { 
    console.log("Constructor called");
    this.sub1$=this.platform.pause.subscribe(() => {        
      console.log('****UserdashboardPage PAUSED****');
      this.child.pauseGameRendering();
    });  
    this.sub2$=this.platform.resume.subscribe(() => {      
      console.log('****UserdashboardPage RESUMED****');
      this.child.resumeGameRendering();
    });


    if(window.localStorage['AwardDollar'] == undefined)
        this.money = 0;
    else
        this.money = parseInt(window.localStorage['AwardDollar']);
      
  }

  ionViewDidLeave(){
    console.log("at Home Page: ionDidLeave");
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {     
        this.db.addTrack(this.pageTitle, "Leave", this.userProfileService.username); 
      }
    }); 

    this.child.ionViewDidLeaveFunction();
  }

  ionViewDidEnter() {
    this.db.getDatabaseState().subscribe(rdy => {
      this.db.addTrack(this.pageTitle, "Enter", this.userProfileService.username); 
    });      

    this.child.loadFunction();
  }

  ionViewWillEnter() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {     
        this.db.isTableEmpty().then(tableEmpty => {
          console.log("tableEmpty: "+tableEmpty);
          if(!tableEmpty) {
            this.exportDeleteDatabase();
          } 
        }).catch(e => {
          console.log("In ionViewDidEnter at Home:"+e);
        });
      }
    });      

  }


  ionViewWillUnload() {
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }

  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  exportDeleteDatabase(){
    console.log("exportTable at Home Page!");
    this.db.exportDatabaseToJson().then((res) => {
      console.log("upload to AWS at Home Page: "+JSON.stringify(res));
      this.awsS3Service.upload("Tracking",res);
      this.db.dropTable();              
    });   
  }  


  startSurvey(){
    console.log('start survey');
    var currentTime = moment(); 
    var startTime = moment({hour: 18});  // 6pm
    var endTime = moment({hour: 23, minute: 59});  // 11:59pm
    if(!currentTime.isBetween(startTime, endTime)) {
      this.presentAlert('Survey is only available between 6PM and midnight');
    } else if(this.userProfileService.surveyTakenForCurrentDay()) {
      this.presentAlert('You have already completed the survey for the day.');
    } else {
      if (this.userProfileService.isParent){
        this.router.navigate(['survey/samplesurvey']);  //caregiversurvey
      } else{
        this.router.navigate(['survey/samplesurvey2']);  //aya
      }
      /*
      this.ga.trackEvent('Start survey Button', 'Tapped Action', 'Loading survey', 0)
      .then(() => {console.log("trackEvent for Start survey Button!")})
      .catch(e => alert("trackEvent for Start survey Button=="+e));
      */
    } 
  }

  async openSurvey(location){
    this.router.navigate([location]);
  }

  async presentAlert(alertMessage) {
    
    const alert = await this.alertCtrl.create({
      //<div style="font-size: 20px;line-height: 25px;padding-bottom:10px;text-align:center">Thank you for completing the survey. You have unlocked a meme.</div>
      //header: '<div style="line-height: 25px;padding-bottom:10px;text-align:center">Daily survey unavilable</div>',
      header: 'Daily survey unavilable',
      //subHeader: "Survey is not avaibable!",
      message: alertMessage,
      //defined in theme/variables.scss
      buttons: [{text: 'OK', cssClass: 'secondary'}]
    });
    
    /*
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    */

    await alert.present();
  }
  
}
