import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-window',
  //templateUrl: './main-window.component.html',
  template:`<p class="tn"><span>Version: {{plesk}}</span></p>  
  <div> 
  <a href="/admin">
    <img src="assets/images/admin.png" alt="">
  </a>
  <a href="/meteo">
    <img src="assets/images/meteo.png" alt ="">   
  </a>
  <a href="/ohsinfo">   
    <img src="assets/images/kitchen.png" alt =""> 
  </a>
  <a href="/org.openhs.core.clock.servlet.ClockSimpleServlet">      
    <img src="assets/images/clock.png" alt ="">
  </a>
</div>`,
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {

  plesk = 'Winter Line v0.02';
  constructor() {

  }

  ngOnInit() {

  }

}
