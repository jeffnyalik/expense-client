import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Chart, registerables} from 'chart.js';

import { ExpenseSummary } from 'src/app/models/summary/expense';

import { AlertifyService } from './../../services/alertify.service';
import { Expense } from './../../models/expense/expense';
import { AuthService } from './../../services/auth/auth.service';
import { ExpenseService } from './../../services/expense/expense.service';

Chart.register(...registerables);

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  p: any;
  id: any;
  minDate = "";
  ctx:any;
  form = new FormGroup({});
  loading: boolean = false;
  submited: boolean = false;
  expenses: Expense[] = [];
  modalRef: BsModalRef;
  category_data:any
  jwtHelper = new JwtHelperService();
  expense_chart;


  fees:   Expense[] = []
  rent:   Expense[] = []
  food:   Expense[] = []
  others: Expense[] = []

  constructor(private exServices: ExpenseService,
    private router: Router,
    private alerts: AlertifyService, 
    private  auth: AuthService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private expense: ExpenseService,
    private route: ActivatedRoute,
    
    ) { 

      this.form = formBuilder.group({
        'amount': ['', Validators.required],
        'date' : ['', Validators.required],
        'category': ['', Validators.required],
        'description': ['', [Validators.required, Validators.minLength(6)]]
      })
      
  }

  ngOnInit(): void {
    this.getExpenses();
    this.getDate();
    // Chart js configuration
    setTimeout(() => {
    
      this.ctx = document.getElementById('myChart');
      this.expense_chart = new Chart(this.ctx, {
      type: 'pie',
      
      data: {
        labels: ['Fees', 'Rent', 'Food', 'Others'],
        datasets: [
          {
            data: [
              this.getTotolFees(),
              this.getTotolRent(),
              this.getTotolFood(),
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

    }, 1000);;
    // end 
  }

  getTotolFees(){
    let total = 0;
    this.expenses.forEach(e =>{
      if(e.category === 'FEES'){
        const amount = parseFloat(e.amount);
        if(isNaN(amount)){
          
        }else{
          total+=amount;
        }
        
      }
    })
    return total;
  }
  getTotolFood(){
    let total  = 0;
    this.expenses.forEach(e =>{
      if(e.category === 'FOOD'){
        const amount = parseFloat(e.amount);
        if(isNaN(amount)){
          
        }else{
          total+=amount
        }
      }
    })
    return total;
  }

  getTotolRent(){
    let total  = 0;
    this.expenses.forEach(e =>{
      if(e.category === 'RENT'){
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
    this.expenses.forEach(e =>{
      if(e.category === 'OTHERS'){
        const amount = parseFloat(e.amount);
        if(isNaN(amount)){
          
        }else{
          total+=amount
        }
      }
    })
    return total;
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
    // console.log(this.minDate);
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
    this.exServices.allExpenses().subscribe((expenses:Expense[]) =>{
      this.expenses = expenses;
      console.log(this.expenses);
      this.expenses.forEach(e =>{
       this.allocateExpense(e);
      })

    }, error => console.log(error))
  }

  private allocateExpense(expense:Expense){
    if(expense?.category === 'FOOD'){
      this.food.push(expense);
    }else if(expense?.category === 'RENT'){
      this.rent.push(expense);
    }else if(expense?.category === 'FEES'){
      this.fees.push(expense);
    }else{
      this.others.push(expense);
    }
  }

  addExpense(){
    this.loading = true;
    this.submited = true;

    if(this.form.invalid){
      return;
  }

  this.expense.addExpense(this.form.value).subscribe((expense: Expense) =>{
    console.log(expense);
    this.expenses.push(expense);
    this.allocateExpense(expense);
    this.alerts.success("Expense added successfully.");
    this.form.reset();
    this.loading = false
    this.modalService.hide();
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);

  }, error=>{
    console.log(error);
  });
}

expenseInfo(){
  this.expense.singleExpense(this.route.snapshot.params['id']).subscribe(data =>{
    console.log(data);
  }, error =>{
    console.log(error);
  })
}

}