import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'Enviroments/enviroments.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientsService {
  apiUrl = environment.apiUrl;
  private _httpClient = inject(HttpClient);

  getApiClients(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/listApiClient`);
  }

  createApiClient(params: any): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/registerApiClient`, params);
  }

  editApiClient(params: any, id: number): Observable<any> {
    return this._httpClient.put(`${this.apiUrl}/updateApiClient/${id}`, params);
  }

  disabledApiClient(params: any): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/deleteApiClient/${params.id}`, params);
  }

  assignPermissionToApiClient(params: any): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/assignPermissionToApiClient`, params);
  }
}
