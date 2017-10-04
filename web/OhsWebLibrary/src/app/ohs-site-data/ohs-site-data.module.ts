import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tt } from './tt';
import { Bb } from './bb';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class OhsSiteDataModule { }

export class Teta {

  public x: Tt = new Tt();
  public y: Bb = new Bb();

  public val: number = 150.16;

  constructor () {
    this.val = this.y.xx;
  }

}
