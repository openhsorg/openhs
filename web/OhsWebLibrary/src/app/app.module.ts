import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OhsSiteDataModule } from './ohs-site-data/ohs-site-data.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OhsSiteDataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
