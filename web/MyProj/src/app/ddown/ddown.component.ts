import { Component, OnInit } from '@angular/core';
/*
import { NgModule } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
*/
@Component({
  selector: 'app-ddown',
  templateUrl: './ddown.component.html',
  styleUrls: ['./ddown.component.css']
})
/*
@NgModule({
  declarations: [],
  imports: [
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: []
})
*/
export class DdownComponent implements OnInit {

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor() { }

  ngOnInit() {
  }


}
