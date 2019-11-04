import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CustomersComponent} from './customers.component';
import {AuthGuard} from '../_guards/auth.guard';
import {AddCustomerComponent} from './add-customer/add-customer.component';


const routes: Routes = [
  { path: '', component: CustomersComponent, canActivate: [AuthGuard]},
  { path: 'new', component: AddCustomerComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
