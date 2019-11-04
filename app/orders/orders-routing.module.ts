import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders.component';
import {AuthGuard} from '../_guards/auth.guard';
import {AddOrderComponent} from './add-order/add-order.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: '', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'new', component: AddOrderComponent, canActivate: [AuthGuard]},
  { path: 'invoice/:id', component: InvoiceComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
