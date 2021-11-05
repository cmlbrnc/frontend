import { ItemsService } from './../services/items.service';
import { CartService } from './../services/cart.service';
import { NbSecurityModule } from '@nebular/security';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbThemeModule, NbLayoutModule, NbActionsModule, NbUserModule, NbMenuModule, NbContextMenuModule, NbMenuService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { IndexComponent } from './index/index.component';
import { ShoppinCartComponent } from './shoppin-cart/shoppin-cart.component';
import { ItemQuatityComponent } from './item-quatity/item-quatity.component';
import { ItemCardComponent } from './item-card/item-card.component';


@NgModule({
  declarations: [
   HomeComponent,
   IndexComponent,
   ShoppinCartComponent,
   ItemQuatityComponent,
   ItemCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbActionsModule,
    NbUserModule,
    NbContextMenuModule,
    NbMenuModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSecurityModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
  ],
  providers:[CartService,ItemsService]
})
export class HomeModule { }
