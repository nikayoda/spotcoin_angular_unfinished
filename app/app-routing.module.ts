import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './_guards/auth.guard';
import {GuestComponent} from './_layouts/guest/guest.component';
import {NotFoundComponent} from './_layouts/not-found/not-found.component';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
    ]
  },
  { path: '', canActivate: [AuthGuard], loadChildren: './_layouts/logged-in/logged-in.module#LoggedInModule' },
  { path: 'logout', component: LogoutComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
