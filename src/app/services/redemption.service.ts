import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedemptionService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = `${environment.baseUrl}/redemption`;
  }

  redemptionStore(data: any): any {
    return this.http.post<any>(`${this.baseUrl}/store`, data).pipe(
      map((response: any) => response)
    );
  }

  historyClient(data: any): any {
    return this.http.post<any>(`${this.baseUrl}/client-history`, data).pipe(
      map((response: any) => response)
    );
  }

  pendingClient(data: any): any {
    return this.http.post<any>(`${this.baseUrl}/client-pendings`, data).pipe(
      map((response: any) => response)
    );
  }

  historySeller(): any {
    return this.http.get<any>(`${this.baseUrl}/index-completed`).pipe(
      map((response: any) => response)
    );
  }

  pendingSeller(): any {
    return this.http.get<any>(`${this.baseUrl}/index-pending`).pipe(
      map((response: any) => response)
    );
  }

}
