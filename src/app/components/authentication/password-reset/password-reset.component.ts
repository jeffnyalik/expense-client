import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ConfirmedValidator } from 'src/app/password_helper/confirmed.validator';

import { AlertifyService } from './../../../services/alertify.service';
import { AuthService } from './../../../services/auth/auth.service';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
   uidb64 = this.route.snapshot.queryParams['uidb64'];
   token = this.route.snapshot.queryParams['token'];
   form = new FormGroup({});
   loading:boolean = false;
   
  constructor(
     private route: ActivatedRoute,
     private router: Router,
     private alerts: AlertifyService,
     private formBuilder: FormBuilder,
     private auth: AuthService) { 
      this.form = this.formBuilder.group({
      uidb64: [this.uidb64],
      token: [this.token],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'password_confirm': ['', [Validators.required]]
      }, {
        validator: ConfirmedValidator('password', 'password_confirm')
      })
     }

  ngOnInit(): void {
   
  }

  get f(){
    return this.form.controls;
  }
  
  onSubmit(){
    this.loading = true;
    if(this.form.invalid){
      return;
    }

    this.auth.resetPasswordSubmit(this.form.value).subscribe(data =>{
      console.log(data);
      this.alerts.success('Password changed, you can now login');
      this.router.navigate(['/login']);
    }, error=>{
      console.log(error);
      this.alerts.error("Process failed");
      this.loading = false;
    });
    
  }
}