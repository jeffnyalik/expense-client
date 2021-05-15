import { Router } from '@angular/router';
import { AlertifyService } from './../alertify.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from './../../../environments/environment';




@Injectable({
  providedIn: 'root'
})

export class AuthService {
jwtHelper = new JwtHelperService();
public BASE_URL = environment.BASE_URL;
public LOGIN_URL = 'auth/login/';
public REGISTER_URL = 'auth/register/';
public VERIFY_EMAIL = 'auth/email-verify';

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private userName = new BehaviorSubject<string>(localStorage.getItem('username'));
  private email = new BehaviorSubject<string>(localStorage.getItem('email'));

  constructor(private httpClient: HttpClient, private alerts: AlertifyService, private router: Router) { 
  }

  registerUser(form:any){
    return this.httpClient.post(`${this.BASE_URL}${this.REGISTER_URL}`, form).pipe(
      map((res: any) => res)
    )
  }

  checkLoginStatus(): boolean
  { 
    const isReallyLoggedIn = localStorage.getItem('loginStatus');
    if(isReallyLoggedIn == '1'){
      if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined){
        return false;
      }
       // Get and Decode the Token
       const token = localStorage.getItem('token');
       const decoded = this.jwtHelper.decodeToken(token);

       if(decoded.exp === undefined){
         return false;
       }
        // Get Current Date Time
        const date = new Date(0);

        // Convert EXp Time to UTC
       let tokenExpDate = date.setUTCSeconds(decoded.exp);
       if(tokenExpDate.valueOf() > new Date().valueOf()) 
        {   
            return true;
        }

        console.log("NEW DATE " + new Date().valueOf());
        console.log("Token DATE " + tokenExpDate.valueOf());
        
        return false;

       // If Value of Token time greter than 
      // Check if the cookie is valid
    }
    return false;
  }
  

  loginUser(model: any){
    return this.httpClient.post(`${this.BASE_URL}${this.LOGIN_URL}`, model).pipe(
      map((res: any) =>{
        if(res && res.tokens.access){
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('token', res.tokens.access);
          localStorage.setItem('refresh', res.tokens.refresh);
          localStorage.setItem('username', res.username);
          localStorage.setItem('email', res.email);
          this.userName.next(localStorage.getItem('username'));
          this.email.next(localStorage.getItem('email'));
        }
        return res;
      })
    )
  }

  logUserOut(){
    this.loginStatus.next(true);
    localStorage.setItem('loginStatus', '0');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('refresh');
  }

  get isLoggedIn(){
    return this.loginStatus.asObservable();
  }

  get currentUsername(){
    return this.userName.asObservable();
  }

  get currentEmail(){
    return this.email.asObservable();
  }

  verifyEmail(token: string){
    let params = new HttpParams();
    params = params.append('token', token);
    return this.httpClient.get(`${this.BASE_URL}${this.VERIFY_EMAIL}`, {params:params});
  }
}
