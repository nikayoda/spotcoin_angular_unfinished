import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MerchantEmployeesComponent} from './merchant-employees.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbSpinnerModule} from '@nebular/theme';
import {MerchantEmployeesRoutingModule} from './merchant-employees-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    MerchantEmployeesRoutingModule
  ],
  declarations: [
    MerchantEmployeesComponent,
    AddEmployeeComponent
  ],
  exports: [
    MerchantEmployeesComponent,
  ]
})
export class MerchantEmployeesModule {

}
