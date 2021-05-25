import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AlertifyService } from './../../../services/alertify.service';
import { AuthService } from './../../../services/auth/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form = new FormGroup({});
  loading: boolean = false;
  constructor(
    private auth: AuthService, 
    private alerts: AlertifyService,
    private formBuilder: FormBuilder) { 
      this.form = this.formBuilder.group({
        'email': ['', [Validators.required, Validators.email]]
      });
    }

  ngOnInit(): void {
  }

  get f(){
    return this.form.controls
  }

  passwordReset(){
    this.loading = true;
    if(this.form.invalid){
      return;
    }
    this.auth.resePassword(this.form.value).subscribe((data) =>{
      console.log(data);
      console.log("The button has been submitted successfully");
      this.alerts.success("A reset link has been sent to your email");
      this.form.reset();
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    })
  }

}
