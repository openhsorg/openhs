import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainWindowComponent } from './main-window/main-window.component';
import { Window1Component } from './window1/window1.component';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    Window1Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
