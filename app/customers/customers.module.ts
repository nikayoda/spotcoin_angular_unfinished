import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CustomersComponent} from './customers.component';
import {AddCustomerComponent} from './add-customer/add-customer.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbDatepickerModule, NbSpinnerModule} from '@nebular/theme';
import {CustomersRoutingModule} from './customers-routing.module';
import {NbDateFnsDateModule} from '@nebular/date-fns';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    NbDatepickerModule,
    CustomersRoutingModule,
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      parseOptions: {awareOfUnicodeTokens: true},
      formatOptions: {awareOfUnicodeTokens: true},
    }),
  ],
  declarations: [
    CustomersComponent,
    AddCustomerComponent
  ],
  exports: [
    CustomersComponent
  ]
})
export class CustomersModule { }
