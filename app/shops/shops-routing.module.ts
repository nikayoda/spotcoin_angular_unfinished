import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../_guards/auth.guard';
import {MerchantGuard} from '../_guards/merchant.guard';
import {NgModule} from '@angular/core';
import {ShopsComponent} from './shops.component';
import {AddShopComponent} from './add-shop/add-shop.component';

const routes: Routes = [
  { path: '', component: ShopsComponent, canActivate: [AuthGuard, MerchantGuard] },
  { path: 'new', component: AddShopComponent, canActivate: [AuthGuard, MerchantGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsRoutingModule {}
