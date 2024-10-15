import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'Enviroments/enviroments.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  apiUrl = environment.apiUrl;
  private _httpClient = inject(HttpClient);

  getClientList(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/listClient`);
  }

  getCoinList(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/listarMonedas`);
  }

  deleteClient(id: any): Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}/deleteClient/${id}`);
  }

  getClientById(id: any): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/client/${id}`);
  }
}
