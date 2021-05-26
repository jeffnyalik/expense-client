import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginLoading:boolean = false;
  registerLoading: boolean= false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  
  register(){
    this.registerLoading = true;
    setTimeout(() => {
      this.router.navigate(['/register'])
    }, 3000);
  }
  login(){
    this.loginLoading = true;
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 3000);
  }

}
