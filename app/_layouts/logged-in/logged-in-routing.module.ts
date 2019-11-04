import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoggedInComponent} from './logged-in.component';
import {AuthGuard} from '../../_guards/auth.guard';
import {PaymentIntegrationComponent} from '../../payment-integration/payment-integration.component';
import {BrandingComponent} from '../../branding/branding.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedInComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: '../../home/home.module#HomeModule' },

      { path: 'shops', loadChildren: '../../shops/shops.module#ShopsModule' },

      { path: 'employees', loadChildren: '../../merchant-employees/merchant-employees.module#MerchantEmployeesModule' },

      { path: 'customers', loadChildren: '../../customers/customers.module#CustomersModule' },

      { path: 'orders', loadChildren: '../../orders/orders.module#OrdersModule' },

      { path: 'payment-integration', component: PaymentIntegrationComponent, canActivate: [AuthGuard]},
      { path: 'branding', component: BrandingComponent, canActivate: [AuthGuard]},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedInRoutingModule {}
