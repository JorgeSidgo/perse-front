import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../entity/Account';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Login } from '../entity/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.baseUrl;
  }

  login(data: Login): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/auth/login`, data).pipe(
      map((response: Account) => response)
    );
  }
}
