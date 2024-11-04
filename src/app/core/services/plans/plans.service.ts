import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'Enviroments/enviroments.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  apiUrl = environment.apiUrl;
  private _httpClient = inject(HttpClient);

  getPlansList(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/listPlan`);
  }

  getTipoPagoList(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/listarTipoPago`);
  }

  deletePlan(planId: any): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/deletePlan/${planId}`, {});
  }
}
