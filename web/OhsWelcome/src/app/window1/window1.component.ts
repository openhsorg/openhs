import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window1',
  templateUrl: './window1.component.html',
  styleUrls: ['./window1.component.css']
})
export class Window1Component implements OnInit {

  constructor() {

    window.alert('w1....');
   }

  ngOnInit() {
  }

}
