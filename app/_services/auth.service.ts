import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CurrentUser} from '../_models/currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl =  environment.apiUrl + 'a/m';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + '/auth/mlogin', {username, password})
      .pipe(
        map((response: any) => {
          // login successful if there's a jwt token in the response
          const user = response;
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
        })
      );
  }

  getUserInfo(): CurrentUser {
    const userToken = localStorage.getItem('currentUser');
    if (userToken) {
      this.decodedToken = this.jwtHelper.decodeToken(userToken);
      if (this.decodedToken.Role === 'ma') {
        this.decodedToken.role = 'Merchant';
      } else {
        this.decodedToken.role = 'Cashier';
      }
      return this.decodedToken;
    }
  }

  loggedIn() {
    const token = localStorage.getItem('currentUser');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
