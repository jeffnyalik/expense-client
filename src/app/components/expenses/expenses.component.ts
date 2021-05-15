import { Router } from '@angular/router';
import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ExpenseService } from './../../services/expense/expense.service';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenses: any;
  jwtHelper = new JwtHelperService();
  constructor(private exServices: ExpenseService,
    private router: Router,
    private alerts: AlertifyService, 
    private  auth: AuthService) { 
  }

  ngOnInit(): void {
    this.exServices.allExpenses().subscribe(data =>{
      this.expenses = data;
      console.log(this.expenses);
    }, error => console.log(error))
  }
  
}
