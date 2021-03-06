import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { OffersComponent } from './offers/offers.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { OfferItemComponent } from './offers/offer-item/offer-item.component';
import { OfferDetailsComponent } from './offers/offer-details/offer-details.component';
import { OfferFormComponent } from './offers/offer-form/offer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    OffersComponent,
    HeaderComponent,
    OfferItemComponent,
    OfferDetailsComponent,
    OfferFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthRoutingModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
