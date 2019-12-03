import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = `${environment.baseUrl}/type-product`;
  }

  index(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/index`).pipe(
      map((response: any) => response)
    );
  }
}
