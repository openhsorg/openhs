import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ButtonOverviewExampleComponent } from './button-overview-example/button-overview-example.component';
import { DdownComponent } from './ddown/ddown.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    ButtonOverviewExampleComponent,
    DdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
