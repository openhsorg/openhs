import { Component } from '@angular/core';
import { FrameMain } from './OhsAdmin/FrameMain';
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
  // public m_siteData:                 SiteData = null;

  constructor () {

    // this.m_siteData = new SiteData ();

    this.canvas = <HTMLCanvasElement> document.getElementById('infoCanvas');
    //  window.alert('aaaa');
     this.ctx = this.canvas.getContext('2d');

    this.m_frame = new FrameMain(this.canvas);

    //window.alert('AppComponent');


    // requestAnimationFrame(() => this.paint());
  }
/*
  public paint () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.canvas.width / 2, this.canvas.width / 2);
    this.ctx.rotate(Math.PI / 180);
    this.ctx.translate(-this.canvas.width / 2, -this.canvas.width / 2);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.canvas.width / 4, this.canvas.width / 4, this.canvas.width / 2, this.canvas.height / 4);
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.canvas.width / 4, this.canvas.width / 2, this.canvas.width / 2, this.canvas.height / 4);

    requestAnimationFrame(() => this.paint());
  }
  */
}
