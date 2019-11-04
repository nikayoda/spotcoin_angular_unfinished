import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MerchantEmployeesComponent} from './merchant-employees.component';
import {AuthGuard} from '../_guards/auth.guard';
import {MerchantGuard} from '../_guards/merchant.guard';
import {AddEmployeeComponent} from './add-employee/add-employee.component';


const routes: Routes = [
  { path: '', component: MerchantEmployeesComponent, canActivate: [AuthGuard, MerchantGuard] },
  { path: 'new', component: AddEmployeeComponent, canActivate: [AuthGuard, MerchantGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantEmployeesRoutingModule {}
