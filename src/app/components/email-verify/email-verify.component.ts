import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { AuthService } from './../../services/auth/auth.service';


@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {
  urlParams: any = {};
  emailConfirmed: boolean = false;
  token: any;
  constructor(private auth: AuthService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.activateRoute.snapshot.queryParams['token'];
    this.getVerification(this.activateRoute.snapshot.queryParams['token']);
    console.log(this.token)
  }
  
  
  getVerification(token){
    this.auth.verifyEmail(token).subscribe(
      data =>{
        console.log(data)
        console.log('EMAIL HAS BEEN CONFIRMED AND ACTIVATED')
        this.emailConfirmed = true
      }, error =>{
        console.log(error)
        this.emailConfirmed = false
      }
    )
  }
}
