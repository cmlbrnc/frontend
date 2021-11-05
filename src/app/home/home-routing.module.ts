import { ShoppinCartComponent } from './shoppin-cart/shoppin-cart.component';
import { HomeComponent } from './home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
   {
     path:'',
     component:HomeComponent,
     children:[
      
      {
        path:'',
        component:IndexComponent
      },
      {
        path:'cart',
        component:ShoppinCartComponent
      },

     ]
   },
   
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HomeRoutingModule {
}
