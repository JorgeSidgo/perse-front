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

  updateSeller(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/user/update-seller/` + id, data).pipe(
      map((response: any) => response)
    );
  }

  updateClient(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/user/update-client/` + id, data).pipe(
      map((response: any) => response)
    );
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/destroy/` + id).pipe(
      map((response: any) => response)
    );
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/show/${id}`).pipe(
      map((response: any) => response)
    );
  }

  getClients(page: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/index-clients?page=${page}`).pipe(
      map((response: any) => response)
    );
  }

  getClientsNoGift(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/show-without-gift`).pipe(
      map((response: any) => response)
    );
  }

  seachClients(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/search-clients?data=` + query).pipe(
      map((response: any) => response)
    );
  }

  show(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/show/` + id).pipe(
      map((response: any) => response)
    );
  }

  seachSellers(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/search-sellers?data=` + query).pipe(
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

  sendSpam(data: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/index-sellers`).pipe(
      map((response: any) => response)
    );
  }
}
