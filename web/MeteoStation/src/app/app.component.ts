import { Component } from '@angular/core';
import { FrameMain } from './MeteoStation/FrameMain';

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
  // public m_siteData:                 SiteData = null;

  constructor () {

    this.canvas = <HTMLCanvasElement> document.getElementById('infoCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.m_frame = new FrameMain(this.canvas);

  }  
}
