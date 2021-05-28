import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { ExpenseSummary } from './../../models/summary/expense';



@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  public BASE_URL = environment.BASE_URL;
  public EXPENSE_URL = 'expenses/';
  public INCOME_URL = 'income/';
  public EXPENSE_SUMMARY = 'userstats/expense-summary-data'
  public INCOME_SUMMARY = 'userstats/income-summary-data'

  

  constructor(private httpClient: HttpClient) { }

  private _refreshPage$ = new Subject<void>();

  get refreshNeeded$(){
    return this._refreshPage$.asObservable();
  }

  allExpenses(){
    return this.httpClient.get(`${this.BASE_URL}${this.EXPENSE_URL}`)
    .pipe(tap(() =>{
      this._refreshPage$.next();
    }))
  }

  singleExpense(id: any): Observable<any>{
    return this.httpClient.get(`${this.BASE_URL}${this.EXPENSE_URL}${id}`, id);
  }

  updateExpense(id, data): Observable<any>{
    return this.httpClient.put(`${this.BASE_URL}${this.EXPENSE_URL}${id}`, data);
  }

  removeExpense(id): Observable<any>{
    return this.httpClient.delete(`${this.BASE_URL}${this.EXPENSE_URL}${id}`, id);
  }
  

  addExpense(model:any){
    return this.httpClient.post(`${this.BASE_URL}${this.EXPENSE_URL}`, model);
  }

  // expenseSummary(): Observable<any>{
  //   return this.httpClient.get(`${this.BASE_URL}${this.EXPENSE_SUMMARY}`)
  //   .pipe(tap(() =>{
  //     this._refreshPage$.next();
  //   }))
  // }

  //####Income####//
  getIncome(): Observable<any>{
    return this.httpClient.get(`${this.BASE_URL}${this.INCOME_URL}`);
  }

  addIncome(model:any){
    return this.httpClient.post(`${this.BASE_URL}${this.INCOME_URL}`, model);
  }

  singleIncome(id: any): Observable<any>{
    return this.httpClient.get(`${this.BASE_URL}${this.INCOME_URL}${id}`, id);
  }

  updateIncome(id, data): Observable<any>{
    return this.httpClient.put(`${this.BASE_URL}${this.INCOME_URL}${id}`, data);
  }

  removeIncome(id): Observable<any>{
    return this.httpClient.delete(`${this.BASE_URL}${this.INCOME_URL}${id}`, id);
  }
  
  incomeRevenue():Observable<any>{
    return this.httpClient.get(`${this.BASE_URL}${this.INCOME_SUMMARY}`)
    .pipe(tap(() =>{
      this._refreshPage$.next();
    }))

  }
}
