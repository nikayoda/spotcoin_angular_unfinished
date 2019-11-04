import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopsRoutingModule} from './shops-routing.module';
import {ShopsComponent} from './shops.component';
import {AddShopComponent} from './add-shop/add-shop.component';
import {NbAccordionModule, NbCardModule, NbSpinnerModule, NbTabsetModule} from '@nebular/theme';
import {LineChartModule} from '@swimlane/ngx-charts';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShopsRoutingModule,
    NbTabsetModule,
    LineChartModule,
    NbAccordionModule,
    NbCardModule,
    NbSpinnerModule
  ],
  declarations: [
    ShopsComponent,
    AddShopComponent
  ],
  exports: [
    ShopsComponent
  ]
})
export class ShopsModule {}
