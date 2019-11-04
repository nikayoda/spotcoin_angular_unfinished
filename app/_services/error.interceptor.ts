import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return throwError(err.statusText);
          }
          const applicationError = err.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }
          const serverError = err.error;
          let modalStateErrors: string;
          if (serverError && typeof serverError === 'object') {
            switch (+err.error.rc) {
              case  601:
                return throwError('Invalid Merchant Account UserName Or Password');
              case 602:
                return throwError('Merchant Account Is Not Activate');
              case 603:
                return throwError('Merchant Account Email Is Not Validated');
              case 604:
                return throwError('Merchant Employee Account UserName Already Taken');
              case 605:
                return throwError('Invalid Merchant Employee Account UserName Or Password');
              case 606:
                return throwError('Merchant Employee Account Is Not Active');
              case 607:
                return throwError('Not Merchant Account');
              case 702:
                return throwError('Order Status Name Already Exist');
              case 703:
                return throwError('Order is Not Unpaid');
              case 800:
                return throwError('Invalid Payment Gateway Id');
              case 801:
                return throwError('Invalid Order Id');
              case 802:
                return throwError('Invalid Merchant Id');
              case 803:
                return throwError('Invalid Employee Id');
              case 804:
                return throwError('Not Enought Spot In Merchant Wallet');
              default:
                return throwError('Something went wrong');
            }
          }
          modalStateErrors = err.error;
          return throwError(modalStateErrors || serverError || 'Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
