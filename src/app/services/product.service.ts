import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../entity/Response';
import { map } from 'rxjs/operators';
import { Product } from '../entity/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = `${environment.baseUrl}/product`;
  }

  index(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/index`).pipe(
      map((response: any) => response)
    );
  }

  store(data: Product): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/store`, data).pipe(
      map((response: any) => response)
    );
  }
  update(data: Product, id:number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/`+id, data).pipe(
      map((response: any) => response)
    );
  }

  show(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/show/` +id ).pipe(
      map((response: any) => response)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/destroy/`+id ).pipe(
      map((response: any) => response)
    );
  }

  available(_points: number): Observable<any> {

    const payload = {
      points: _points
    };

    return this.http.post<any>(`${this.baseUrl}/products-available`, payload).pipe(
      map((response: any) => response)
    );
  }

  availableNoImg(_points: number): Observable<any> {

    const payload = {
      points: _points
    };

    return this.http.post<any>(`${this.baseUrl}/products-available-noimg`, payload).pipe(
      map((response: any) => response)
    );
  }
}
