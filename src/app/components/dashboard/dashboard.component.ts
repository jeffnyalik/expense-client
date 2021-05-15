import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'IncomeExpense'
  constructor(private auth: AuthService, private alerts: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    
  }
}
