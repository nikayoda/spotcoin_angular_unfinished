import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../_guards/auth.guard';
import {HomeComponent} from './home.component';
import {MerchantGuard} from '../_guards/merchant.guard';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard, MerchantGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
