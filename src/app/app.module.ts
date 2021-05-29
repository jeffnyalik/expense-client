
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { AlertifyService } from './services/alertify.service';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ConfirmMessageComponent } from './components/confirm-message/confirm-message.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { IncomeComponent } from './components/income/income.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth/auth.service';
import { ChangePasswordComponent } from './components/authentication/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { PasswordResetComponent } from './components/authentication/password-reset/password-reset.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ExpenseDetailComponent } from './components/expenses/expense-detail/expense-detail.component';
import { IncomeDetailComponent } from './components/income/income-detail/income-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    AuthenticationComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    ExpensesComponent,
    EmailVerifyComponent,
    NavBarComponent,
    FooterComponent,
    IncomeComponent,
    ExpenseDetailComponent,
    IncomeDetailComponent,
    ConfirmMessageComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatIconModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    AlertifyService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true,},

    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
