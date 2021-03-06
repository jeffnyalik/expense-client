import { ChangePasswordComponent } from './components/authentication/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { ConfirmMessageComponent } from './components/confirm-message/confirm-message.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { HomeComponent } from './components/home/home.component';
import { IncomeComponent } from './components/income/income.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { PasswordResetComponent } from './components/authentication/password-reset/password-reset.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ExpenseDetailComponent } from './components/expenses/expense-detail/expense-detail.component';
import { IncomeDetailComponent } from './components/income/income-detail/income-detail.component';

  
  const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'confirm-message', component: ConfirmMessageComponent},
  {path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard]},
  {path: 'expenses/:id', component: ExpensesComponent, canActivate: [AuthGuard]},

  {path: 'expense-detail/:id', component: ExpenseDetailComponent, canActivate: [AuthGuard]},
  {path: 'income', component: IncomeComponent, canActivate: [AuthGuard]},
  {path: 'income-detail/:id', component: IncomeDetailComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'email-verify', component: EmailVerifyComponent},
  {path: 'password-reset-form', component: ForgotPasswordComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'password-change', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'user-profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }