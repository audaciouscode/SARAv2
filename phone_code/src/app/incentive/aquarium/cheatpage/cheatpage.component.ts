import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/user/user-profile/user-profile.service';

@Component({
  selector: 'app-cheatpage',
  templateUrl: './cheatpage.component.html',
  styleUrls: ['./cheatpage.component.scss'],
})
export class CheatpageComponent implements OnInit {

  public totalPoints;
  public currentPoints;
  public myInput: string;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {

    /*
    if(window.localStorage['TotalPoints'] == undefined)
      this.currentPoints = 0;
    else
      this.currentPoints = parseInt(window.localStorage['TotalPoints']);
    */
    this.currentPoints = this.userProfileService.points;
    /*
    //set the total points to currentPoints, because
    // if I press return, then it will set the value to zero
    this.totalPoints = this.currentPoints;
    console.log("Current points: " + this.totalPoints);
    console.log("Total points: " + this.totalPoints);
    */
  }

  logChange(event) {
    //console.log(event);
    console.log("Total points: " + this.totalPoints);
  }

  resetPoint(){

    if(this.totalPoints == undefined){
      console.log("Total points not set");
      return;
    }


    console.log("Total points: " + this.totalPoints);
    this.currentPoints = this.totalPoints;

    //
    /*
    
    if(window.localStorage['TotalPoints'] == undefined)
      this.totalPoints = 0;
    else
      this.totalPoints = parseInt(window.localStorage['TotalPoints']);
    */
    //this.totalPoints = 700;//this.totalPoints + 100;
    //window.localStorage.setItem("TotalPoints", ""+this.totalPoints); 
    this.userProfileService.cheatPoints(this.totalPoints);
  }

  returnToAquarium(){
    window.location.href = '/home';
  }

}
