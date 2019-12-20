import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../entity/Account';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Login } from '../entity/Login';
import { Router } from '@angular/router';
import * as cryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.baseUrl = environment.baseUrl;
  }

  login(data: Login): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/auth/login`, data).pipe(
      map((response: Account) => response)
    );
  }

  setToken(token: any): void {
    window.localStorage.setItem('Authorization', cryptoJs.AES.encrypt(JSON.stringify(token), environment.secret));
    window.localStorage.setItem('Token', JSON.stringify(token.token));
  }

  getAccount(): Account {
    const decodedAuth = cryptoJs.AES.decrypt(localStorage.getItem('Authorization'), environment.secret);
    return JSON.parse(decodedAuth.toString(cryptoJs.enc.Utf8)) as Account;
  }

  getAccountId(): number {
    const decodedAuth = cryptoJs.AES.decrypt(localStorage.getItem('Authorization'), environment.secret);
    return JSON.parse(decodedAuth.toString(cryptoJs.enc.Utf8)).id_user;
  }

  getToken(): string {
    return JSON.parse(window.localStorage.getItem('Token'));
  }

  removeToken(): void {
    window.localStorage.removeItem('Authorization');
    window.localStorage.removeItem('Token');
    window.localStorage.removeItem('Permit');
  }

  logout(): void {

    this.http.post<Account>(`${this.baseUrl}/auth/logout`, {}).pipe(
      map((response: Account) => response)
    );

    this.removeToken();
    this.router.navigateByUrl('/login');
  }
}
