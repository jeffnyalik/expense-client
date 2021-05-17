import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth/auth.service';
import { ExpenseService } from './../../services/expense/expense.service';



@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  p: any;
  form = new FormGroup({});
  loading: boolean = false;
  submited: boolean = false;
  expenses: any;
  modalRef: BsModalRef;
  jwtHelper = new JwtHelperService();
  constructor(private exServices: ExpenseService,
    private router: Router,
    private alerts: AlertifyService, 
    private  auth: AuthService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private expense: ExpenseService,
    ) { 

      this.form = formBuilder.group({
        'amount': ['', Validators.required],
        'date' : ['', Validators.required],
        'category': ['', Validators.required],
        'description': ['', [Validators.required, Validators.minLength(6)]]
      })

      this.exServices.listen().subscribe((m: any) =>{
        console.log(m);
      })
  }

  ngOnInit(): void {
    this.getExpenses();
  }

  get f(){
    return this.form.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  viewMoreModal(edit: TemplateRef<any>){
    this.modalRef = this.modalService.show(edit);
  }

  getExpenses(){
    //call all the expense in this method
    this.exServices.allExpenses().subscribe(data =>{
      this.expenses = data;
      console.log(this.expenses);
    }, error => console.log(error))
  }

  addExpense(){
    this.loading = true;
    this.submited = true;

    if(this.form.invalid){
      return;
  }

  this.expense.addExpense(this.form.value).subscribe(data =>{
    console.log(data);
    this.alerts.success("Expense added successfully.");
    this.form.reset();
    this.loading = false
    this.getExpenses();
  }, error=>{
    console.log(error);
  });
}
  
}
