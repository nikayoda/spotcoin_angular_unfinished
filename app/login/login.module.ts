import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
}
