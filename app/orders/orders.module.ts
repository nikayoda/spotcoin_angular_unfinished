import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {AddOrderComponent} from './add-order/add-order.component';
import {InvoicePrintComponent} from './invoice-print/invoice-print.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {NbCardModule, NbDatepickerModule, NbDialogModule, NbPopoverModule, NbRadioModule, NbSpinnerModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {MatSelectModule} from '@angular/material';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {NgxPrintModule} from 'ngx-print';
import {OrderPayModalComponent} from '../order-pay-modal/order-pay-modal.component';
import {NbDateFnsDateModule} from '@nebular/date-fns';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    NbRadioModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      parseOptions: {awareOfUnicodeTokens: true},
      formatOptions: {awareOfUnicodeTokens: true},
    }),
    NbDialogModule.forRoot(),
    NbPopoverModule,
    NgxPrintModule,
    NbCardModule
  ],
  declarations: [
    OrdersComponent,
    AddOrderComponent,
    InvoiceComponent,
    InvoicePrintComponent,
    OrderPayModalComponent
  ],
  entryComponents: [OrderPayModalComponent, InvoicePrintComponent],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule {}
