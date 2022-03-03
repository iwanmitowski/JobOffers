import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { OffersComponent } from './offers/offers.component';
import { OrganisationsComponent } from './organisations/organisations.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    OffersComponent,
    OrganisationsComponent,
    MainComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
