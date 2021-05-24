import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { ConfirmMessageComponent } from './components/confirm-message/confirm-message.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { HomeComponent } from './components/home/home.component';
import { IncomeComponent } from './components/income/income.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ExpenseDetailComponent } from './components/expenses/expense-detail/expense-detail.component';
import { IncomeDetailComponent } from './components/income/income-detail/income-detail.component';

  
  const routes: Routes = [
  {path: '', component: ExpensesComponent, canActivate: [AuthGuard]},
  {path: 'confirm-message', component: ConfirmMessageComponent},
  {path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard]},
  {path: 'expenses/:id', component: ExpensesComponent, canActivate: [AuthGuard]},

  {path: 'expense-detail/:id', component: ExpenseDetailComponent, canActivate: [AuthGuard]},
  {path: 'income', component: IncomeComponent, canActivate: [AuthGuard]},
  {path: 'income-detail/:id', component: IncomeDetailComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'email-verify', component: EmailVerifyComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }