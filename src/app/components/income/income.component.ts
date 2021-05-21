import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AlertifyService } from './../../services/alertify.service';
import { ExpenseService } from './../../services/expense/expense.service';



@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
 p:any;
 incomeRevenue: any;
 modalRef: BsModalRef;
 loading: boolean = false;
 submitted:boolean = false;
 minDate = "";
 form = new FormGroup({});
 amount = 0;
 
 incomeSummary = {
  "income_data": {
    "SALARY": {
      "amount": this.amount
    },
    'BUSINESS': {
      "amount": this.amount
    },
    'SIDE_HUSTLE': {
      "amount": this.amount
    },
    'OTHERS': {
      "amount": this.amount
    },
  }
}

  constructor(
    private income: ExpenseService,
    private alerts: AlertifyService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    ) { 
      this.form = this.formBuilder.group({
        'amount': ['', Validators.required],
        'date' : ['', Validators.required],
        'source': ['', Validators.required],
        'description': ['', [Validators.required, Validators.minLength(6)]]
      })
    }

  ngOnInit(): void {
    this._getIncome();
    this._getIncomeSummary();
    this.getDate()
  }


  get f(){
    return this.form.controls
  }

  addIncome(){
    this.loading = true;
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.income.addIncome(this.form.value).subscribe((data) =>{
      console.log(data);
      this.loading = false;
      this.modalRef.hide()
      this._getIncome();
      this.alerts.success("Added successfully");
    }, error=>{
      console.log(error);
      this.alerts.error("An error has occured");
    })
  }  
  getDate(){
    let date = new Date();

    let toDate:any = date.getDate();
    if(toDate < 10){
      toDate = '0' + toDate;
    }

    let month: any = date.getMonth() + 1;
    if(month < 10){
      month = '0' + month;
    }
    

    let year = date.getFullYear();
    this.minDate = year + "-" + month + "-" + toDate;
    console.log(this.minDate);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private _getIncome(){
    this.income.getIncome().subscribe((data) =>{
      this.incomeRevenue = data;
      console.log(this.incomeRevenue);
    }, error =>{
      console.log(error);
      this.alerts.error('Error fetching data');
    });
  }
  
  private _getIncomeSummary(){
    this.income.incomeRevenue().subscribe((data) =>{
      this.incomeSummary = data;
      console.log(this.incomeSummary);
    }, error=>{
      console.log(error)
    })
  }

}
