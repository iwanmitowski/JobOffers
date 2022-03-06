import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OfferDetailsComponent } from "../offers/offer-details/offer-details.component";
import { OfferFormComponent } from "../offers/offer-form/offer-form.component";
import { OffersComponent } from "../offers/offers.component";
import { MainComponent } from "./main.component";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children:[
            {
                path: 'offers',
                component: OffersComponent,
            },
            {
                path: 'offers/create',
                component:  OfferFormComponent,
            },
            {
                path: 'offers/edit/:id',
                component: OfferDetailsComponent,
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'offers'
            }
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule{

}