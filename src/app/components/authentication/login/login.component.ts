import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertifyService } from './../../../services/alertify.service';
import { AuthService } from './../../../services/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loginError: string;
  loginSucess: string;
  tokens = '';
  form: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
     private auth: AuthService,
     private formBuilder: FormBuilder,
     private router: Router,
     private alerts: AlertifyService,
     private route: ActivatedRoute
     ) { 
      const currentLog = localStorage.getItem('loginStatus');
      if(currentLog == '1'){
        router.navigate(['/']);
      }
     }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){
    return this.form.controls;
  }

  login(){
   this.submitted = true;
   this.loading = true;
   if(this.form.invalid){
     return;
   }
   this.auth.loginUser(this.form.value).subscribe(data =>{
     this.loading = false;
     this.alerts.success('Logged In successfully');
     
     this.router.navigateByUrl(this.returnUrl);
    //  this.router.navigate(['/dashboard']);
    //  this.loginSucess = data;
    //  console.log(this.loginSucess.tokens.access);
    //  console.log(data.tokens.refresh);
    //  console.log(data.username);
    //  console.log(data.email);
   }, error =>{
     this.loginError = error;
     this.alerts.error("There is an error")
     this.loading = false;
   })
  }

}
