import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth/auth.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username$: Observable<string>;
  email$: Observable<string>;
  loginStatus$: Observable<boolean>;

  constructor(private auth: AuthService, private alerts: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.loginStatus$ = this.auth.isLoggedIn;
    this.username$ = this.auth.currentUsername;
    this.email$ = this.auth.currentEmail;
  }

  loggedOut(){
    this.auth.logUserOut();
    this.router.navigate(['/login']);
    this.alerts.success("Logged out successsfully");
  }

}
