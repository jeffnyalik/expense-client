import { Income } from './../../models/income/income';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Chart, registerables} from 'chart.js';

import { AlertifyService } from './../../services/alertify.service';
import { ExpenseService } from './../../services/expense/expense.service';
Chart.register(...registerables);

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
 p:any;
 incomeRevenue: Income[] = [];
 modalRef: BsModalRef;
 loading: boolean = false;
 submitted:boolean = false;
 minDate = "";
 form = new FormGroup({});
 income_chart: any;
 ctx:any;
 

 
 salary: Income[] = [];
 business: Income[] = [];
 side_hustle: Income[] = [];
 others: Income[] = [];


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
    this.getDate();

     // Chart js configuration
     setTimeout(() => {
      this.ctx = document.getElementById('myChart');
      this.income_chart = new Chart(this.ctx, {
      type: 'pie',
      
      data: {
        labels: ['Salary', 'business', 'side_hustle', 'Others'],
        datasets: [
          {
            data: [
              this.getTotolSalary(),
              this.getTotolBiz(),
              this.getTotolSideHustle(),
              this.getTotolOthers(),
            ],
            backgroundColor: [
                '#73b4ff',
                '#ffcb80',
                '#59e0c5',
                '#ff869a'
            ],
            borderWidth: 1
            
        },
      ],

    },
    
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
      
     
  });
    }, 2000);
    // end 
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
      this.alerts.success("Added successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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


  private allocateIncome(income: Income){
    if(income?.source === 'SALARY'){
      this.salary.push(income);
    }else if(income?.source === 'BUSINESS'){
      this.business.push(income);
    }else if(income?.source === 'SIDE_HUSTLE'){
      this.side_hustle.push(income);
    }else{
      this.others.push(income);
    }
  }

  private _getIncome(){
    this.income.getIncome().subscribe((income: Income[]) =>{
      this.incomeRevenue = income;
      this.incomeRevenue.forEach(i => {
        this.allocateIncome(i);
        this.modalService.hide();
    
      });
      console.log(this.incomeRevenue);
    }, error =>{
      console.log(error);
      this.alerts.error('Error fetching data');
    });
  }

  getTotolSalary(){
    let total = 0;
    this.incomeRevenue.forEach(e =>{
      if(e.source === 'SALARY'){
        const amount = parseFloat(e.amount);
        if(isNaN(amount)){
          
        }else{
          total+=amount;
        }
        
      }
    })
    return total;
  }
  getTotolBiz(){
    let total  = 0;
    this.incomeRevenue.forEach(e =>{
      if(e.source === 'BUSINESS'){
        const amount = parseFloat(e.amount);
        if(isNaN(amount)){
          
        }else{
          total+=amount
        }
      }
    })
    return total;
  }

  getTotolSideHustle(){
    let total  = 0;
    this.incomeRevenue.forEach(e =>{
      if(e.source === 'SIDE_HUSTLE'){
        const amount = parseFloat(e.amount);
        if(isNaN(amount)){
          
        }else{
          total+=amount
        }
      }
    })
    return total;
  }

  getTotolOthers(){
    let total  = 0;
    this.incomeRevenue.forEach(e =>{
      if(e.source === 'OTHERS'){
        const amount = parseFloat(e.amount);
        if(isNaN(amount)){
          
        }else{
          total+=amount
        }
      }
    })
    return total;
  }

}
