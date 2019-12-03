import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    tokenString: string;

    constructor(public auth: AuthService, public router: Router) {
        this.tokenString = this.auth.getToken() == null ? '' : this.auth.getToken().token;
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('tokenString', this.tokenString);

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.tokenString}`
            }
        });
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {

                if (err.status === 401) {
                    this.auth.removeToken();
                    this.router.navigateByUrl('/login');
                }

                return throwError(err);

            })
        );
    }
}
