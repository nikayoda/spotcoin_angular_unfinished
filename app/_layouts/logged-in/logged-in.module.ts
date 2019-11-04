import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {LoggedInRoutingModule} from './logged-in-routing.module';
import {LoggedInComponent} from './logged-in.component';
import {PaymentIntegrationComponent} from '../../payment-integration/payment-integration.component';
import {BrandingComponent} from '../../branding/branding.component';
import {NbLayoutModule, NbMenuModule, NbSidebarModule, NbSidebarService, NbSpinnerModule} from '@nebular/theme';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {SideNavComponent} from '../side-nav/side-nav.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SidebarModule} from 'ng-sidebar';
import {NbDateFnsDateModule} from '@nebular/date-fns';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoggedInRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    SidebarModule.forRoot(),
    NbSidebarModule,
    NbMenuModule.forRoot(),
    NbSpinnerModule,
    NbDateFnsDateModule.forRoot({
      parseOptions: {awareOfUnicodeTokens: true},
      formatOptions: {awareOfUnicodeTokens: true},
    }),
  ],
  declarations: [
    LoggedInComponent,
    PaymentIntegrationComponent,
    BrandingComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
  ],
  providers: [
    NbSidebarService,
    DatePipe,
  ],
  exports: [
    LoggedInComponent,
  ]
})
export class LoggedInModule {}
