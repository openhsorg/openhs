import { Component } from '@angular/core';
import { FrameMain } from './OhsInfoStation/FrameMain';
import { SiteData } from './OhsSiteData/SiteData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private canvas:             HTMLCanvasElement;
  private ctx:                CanvasRenderingContext2D;
  private m_frame:            FrameMain;

  constructor () {

    this.canvas = <HTMLCanvasElement> document.getElementById('infoCanvas');

     this.ctx = this.canvas.getContext('2d');

   //  window.alert('aaa');

    this.m_frame = new FrameMain(this.canvas);

   // window.alert('aaa');
  }
}
