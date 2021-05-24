import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  minDate:any = "";

  constructor() { }

  ngOnInit(): void {
    this.getDate();
  }

  getDate(){
    let date = new Date();
    let year = date.getFullYear();
    this.minDate = year;
  }

}
