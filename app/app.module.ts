import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {
  NbGlobalPhysicalPosition, NbLayoutModule,
  NbSpinnerModule, NbThemeModule, NbToastrModule
} from '@nebular/theme';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {GuestComponent} from './_layouts/guest/guest.component';
import {NotFoundComponent} from './_layouts/not-found/not-found.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthService} from './_services/auth.service';
import {AuthGuard} from './_guards/auth.guard';
import {ErrorInterceptorProvider} from './_services/error.interceptor';
import {environment} from 'src/environments/environment';

export function tokenGetter() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.token) {
    return currentUser.token;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    NotFoundComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: [environment.domain + '/a/m/auth/login']
      }
    }),
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbSpinnerModule,
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    }),
    AppRoutingModule,
  ],
  entryComponents: [],
  providers: [
    AuthGuard,
    AuthService,
    ErrorInterceptorProvider,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
