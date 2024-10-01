import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'Enviroments/enviroments.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  apiUrl = environment.apiUrl;
  private _httpClient = inject(HttpClient);

  getPermissionsList(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/listarOperationType`);
  }
}
