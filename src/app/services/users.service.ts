import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = `${environment.baseUrl}`;
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, data).pipe(
      map((response: any) => response)
    );
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/show/${id}`).pipe(
      map((response: any) => response)
    );
  }

  getClients(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/index-clients`).pipe(
      map((response: any) => response)
    );
  }

  updateClientPoints(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/set-points`, data).pipe(
      map((response: any) => response)
    );
  }

  getSellers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/index-sellers`).pipe(
      map((response: any) => response)
    );
  }
}
