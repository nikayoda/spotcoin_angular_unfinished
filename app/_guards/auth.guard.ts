import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.loggedIn()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.loggedIn()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
