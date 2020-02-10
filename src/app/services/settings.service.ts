import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = `${environment.baseUrl}/setting`;
  }

  getSettings(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/index`).pipe(
      map((response: any) => response)
    );
  }

  updateSettings(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update`, data).pipe(
      map((response: any) => response)
    );
  }

}
