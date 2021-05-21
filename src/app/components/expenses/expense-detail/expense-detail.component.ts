import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AlertifyService } from './../../../services/alertify.service';
import { ExpenseService } from './../../../services/expense/expense.service';


@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {
  id: any;
  form = new FormGroup({});
  loading: boolean = false;
  submitted: boolean = false;
  modalRef: BsModalRef
  expenseInfo: any;
  constructor(private route: ActivatedRoute, 
    private expense: ExpenseService, 
    private bsModalService: BsModalService,
    private formBuilder: FormBuilder,
    private alerts: AlertifyService,
    private router: Router,
  
    ) { 
      this.form = this.formBuilder.group({
        'amount': ['', Validators.required],
        'category': ['', Validators.required],
        'description': ['', [Validators.required, Validators.minLength(6)]],
        'date': ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.showExpense();
    this.id = this.route.snapshot.paramMap.get('id');
  }

  get f(){
    return this.form.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template);
    ExpenseDetailComponent
  }

  updateExpense(){
    if(this.form.invalid){
      this.submitted;
      this.loading = true;
      return
    }
    this.expense.updateExpense(this.id, this.form.value).subscribe(data =>{
      console.log(data);
      this.loading = false;
      console.log(this.form.value);
      this.alerts.success("Updated successfully");
      this.bsModalService.hide();
    }, error =>{
      console.log(error);
      this.alerts.error("An error has occured");
      this.bsModalService.show;
    })
  }


  deleteExpense(){
  if(confirm("Are you sure you want to delete?")){
    this.expense.removeExpense(this.id).subscribe(
      data =>{
        this.router.navigate(['/expenses']);
        this.alerts.warning("Deleted successfully");
      }, error =>{
        console.log(error);
        this.alerts.error("Failed to delete data")
      }
    )
  }
  return false
  }

  showExpense(){
    this.expense.singleExpense(this.route.snapshot.params['id']).subscribe(data =>{
      this.expenseInfo = data;
      console.log(this.expenseInfo);
    }, error=>{
      console.log(error);
    })
  }

}
