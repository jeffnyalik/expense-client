import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AlertifyService } from './../services/alertify.service';
import { AuthService } from './../services/auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  jwtHelper = new JwtHelperService();
  constructor(private auth: AuthService, private route: Router, private alerts: AlertifyService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const loggedIn = localStorage.getItem('token');
    
  
    if (loggedIn){
      // this.alerts.success("Logged in successfully")
      return true;
    }
    this.alerts.error("NOT AUTHORIZED TO ACCESS");
    this.route.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
    
  }  
}