import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Chart, registerables} from 'chart.js';

import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';

import { AlertifyService } from './../../services/alertify.service';
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
  expenseSummary = {
    "category_data": {
      "FEES": {
        "amount": "0"
      },
      'RENT': {
        "amount": "0"
      },
      'FOOD': {
        "amount": "0"
      },
      'OTHERS': {
        "amount": "0"
      },
    }
  }
  form = new FormGroup({});
  loading: boolean = false;
  submited: boolean = false;
  expenses: any;
  modalRef: BsModalRef;
  category_data:any
  jwtHelper = new JwtHelperService();
  expense_chart:any;
  datas = []
  rent = []
  food = []
  others = []
  
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
    this.getExpenses()
    this.getAllExpenseSummary();
    // this.expense.refreshNeeded$.subscribe(res =>{
    //   this.getAllExpenseSummary();
    // })
    this.getDate();
    this.expense.expenseSummary().subscribe(data =>{
      this.datas.push(data.category_data.FEES.amount);
      this.rent.push(data.category_data.RENT.amount);
      this.food.push(data.category_data.FOOD.amount);
      this.others.push(data.category_data.OTHERS.amount);
    })
      // this.datas.push(data.category_data.FEES.amount)})
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
              this.datas,
              this.rent,
              this.food,
              this.others,
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
    }, 1000);
    // end 
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
    this.modalService.hide();
    this.getExpenses();
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

private getAllExpenseSummary(){
  this.expense.expenseSummary().subscribe(data =>{
    this.expenseSummary = data;
    console.log(this.expenseSummary);
  }, error =>{
    console.log(error);
  })
}
  
}
function foods(foods: any) {
  throw new Error('Function not implemented.');
}

