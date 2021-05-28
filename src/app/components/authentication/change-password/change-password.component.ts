import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertifyService } from './../../../services/alertify.service';
import { AuthService } from './../../../services/auth/auth.service';
import { ConfirmedValidator } from 'src/app/password_helper/confirmed.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  model: any = {};
  form: FormGroup = new FormGroup({});
  loading = false;
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

  onSubmit(){}

}
