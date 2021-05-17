import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  public BASE_URL = environment.BASE_URL;
  public EXPENSE_URL = 'expenses/';
  
  constructor(private httpClient: HttpClient) { }

  allExpenses(){
    return this.httpClient.get(`${this.BASE_URL}${this.EXPENSE_URL}`)
  }
  

  addExpense(model:any){
    return this.httpClient.post(`${this.BASE_URL}${this.EXPENSE_URL}`, model);
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }

  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}
