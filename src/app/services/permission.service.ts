import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = `${environment.baseUrl}/permission`;
  }


  getPermits(role: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/permissions-role/${role}`).pipe(
      map((response: any) => response)
    );
  }
}
