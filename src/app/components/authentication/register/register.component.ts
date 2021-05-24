import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmedValidator } from 'src/app/password_helper/confirmed.validator';

import { AlertifyService } from './../../../services/alertify.service';
import { AuthService } from './../../../services/auth/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  loading = false;
  submitted = false;
  userTakenError: string;
  emailTakenError: string;

  constructor(private formBuilder: FormBuilder,
     private auth: AuthService,
     private alerts: AlertifyService,
     private router: Router) { 
    this.form = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(6)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'password_confirm': ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'password_confirm')
    });
  }


  get f(){
    return this.form.controls
  }

  ngOnInit(): void {
  }
  

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    if(this.form.invalid){
      return;
    }else{
      this.auth.registerUser(this.form.value).subscribe(
        data =>{
          console.log(data)
          console.log('AN ACTIVATION LINK HAS BEEN SENT TO YOUR INBOX, KINLDY ACTIVATE')
          this.form.reset()
          this.loading = true
          this.router.navigate(['/confirm-message'])
          this.alerts.success('Registraion is a success, kindly confirm your email.')
        }, error=>{
          this.loading = false;
          this.userTakenError = error;
          console.log(this.userTakenError);
          this.emailTakenError = error;
        }
      )
    }
  }
  

}
