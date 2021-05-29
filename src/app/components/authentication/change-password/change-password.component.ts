import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmedValidator } from 'src/app/password_helper/confirmed.validator';

import { AlertifyService } from './../../../services/alertify.service';
import { AuthService } from './../../../services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  model: any = {};
  form: FormGroup = new FormGroup({});
  loading = false;
  pass:any;
  error:any;
  constructor(
     private auth: AuthService,
     private formBuilder: FormBuilder,
     private router: Router,
     private alerts: AlertifyService,
     private route: ActivatedRoute
  ) { 

    this.form = this.formBuilder.group({
      'old_password': ['', [Validators.required, Validators.minLength(6)]],
      'new_password': ['', [Validators.required, Validators.minLength(6)]],
      'password_confirm': ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('new_password', 'password_confirm')
    });
  }
  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }

    this.auth.changeUserPassword(this.form.value).
    subscribe(data =>{
      this.pass = data;
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.alerts.confirm("Your password has changed </br> Kindly logout and Login Again with your new password",  () =>{
          this.alerts.success("Ok")
        })
        return this.auth.logUserOut();
      }, 3000);
      this.alerts.success("Your password has changed </br> Kindly logout and Login Again with your new password")
      console.log(this.pass)
    }, error=>{
      this.error = error;
      console.log(error);
    })
  }

}
