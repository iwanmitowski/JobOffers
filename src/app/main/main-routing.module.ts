import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OffersComponent } from "../offers/offers.component";
import { MainComponent } from "./main.component";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children:[
            {
                path: 'offers',
                component: OffersComponent
            },
            // {
            //     path: 'offers/create',
            //     component:  ,
            //     canActivate: [aclGuard]  
            // },
            // {
            //     path: 'offers/edit/:id',
            //     component: 
            // },
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