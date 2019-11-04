import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {Observable} from 'rxjs';
import {CurrentUser} from '../_models/currentUser';

@Injectable({
  providedIn: 'root'
})
export class MerchantGuard implements CanActivate {
  currUser: CurrentUser;

  constructor(private router: Router,
              private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.currUser = this.authService.getUserInfo();
    if (this.currUser.role === 'Merchant') {
      return true;
    }
    this.router.navigate(['/orders']);
    return false;
  }
}
