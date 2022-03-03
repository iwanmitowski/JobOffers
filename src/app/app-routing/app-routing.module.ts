import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { OffersComponent } from '../offers/offers.component';
import { UsersComponent } from '../users/users.component';

const routes: Routes = [
  {
    path: 'offers',
    component: OffersComponent,
  },
  {
    path: 'user',
    component: UsersComponent,
  }

]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
