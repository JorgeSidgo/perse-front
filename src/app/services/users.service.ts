import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = `${environment.baseUrl}/auth`;
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, data).pipe(
      map((response: any) => response)
    );
  }

}
