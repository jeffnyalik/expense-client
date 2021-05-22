import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ExpenseService } from 'src/app/services/expense/expense.service';

import { AlertifyService } from './../../../services/alertify.service';



@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.css']
})
export class IncomeDetailComponent implements OnInit {
  id: any;
  form = new FormGroup({});
  loading: boolean = false;
  submitted: boolean = false;
  modalRef: BsModalRef
  incomeInfo: any;
  expense_chart:any;
 
  constructor(
    private bsModalService: BsModalService,
    private formBuilder: FormBuilder,
    private alerts: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private income:ExpenseService
  ) { 
    this.form = this.formBuilder.group({
      'amount': ['', Validators.required],
      'source': ['', Validators.required],
      'description': ['', [Validators.required, Validators.minLength(6)]],
      'date': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.showIncome();
    this.id = this.route.snapshot.paramMap.get('id');
  }

  get f(){
    return this.form.controls;
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template);
  }
  
  updateIncome(){
    if(this.form.invalid){
      this.submitted;
      this.loading = true;
      return
    }
    this.income.updateIncome(this.id, this.form.value).subscribe(data =>{
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


  deleteIncome(){
  if(confirm("Are you sure you want to delete?")){
    this.income.removeIncome(this.id).subscribe(
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

  showIncome(){
    this.income.singleIncome(this.route.snapshot.params['id']).subscribe(data =>{
      this.incomeInfo = data;
      console.log(this.incomeInfo);
    }, error=>{
      console.log(error);
    })
  }

}
