import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
