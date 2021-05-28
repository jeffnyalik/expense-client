import { Profile } from './../../models/profile/profile';
import { Component, OnInit } from '@angular/core';

import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile:any = [];
  constructor(private auth: AuthService, private alerts: AlertifyService) { }


  ngOnInit(): void {
    this.getUser();
  }

  private getUser(){
    this.auth.getUserProfile().subscribe((profile:Profile[]) =>{
      this.profile = profile;
      console.log(this.profile);
    })
  }

  editProfile(){
    this.auth.updateUserProfile(this.profile).subscribe((profile)=>{
      if(this.profile){
        this.alerts.success('Profile updated successfully.')
        console.log(this.profile);
      }
    })
  }

}
