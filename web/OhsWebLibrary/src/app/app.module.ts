import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { OhsSiteDataModule } from './ohs-site-data/ohs-site-data.module';
// import { OhsAdminModule } from './ohs-admin/ohs-admin.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }


