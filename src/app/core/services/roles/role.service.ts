import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'Enviroments/enviroments.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = environment.apiUrl;
  private _httpClient = inject(HttpClient);

  getRoleList(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/listRoles`);
  }

  deleteRole(roleId: any): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/deleteRole/${roleId}`, {});
  }

  saveRole(params: any): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/createRole`, params);
  }

  updateRole(roleId: any, params: any): Observable<any> {
    return this._httpClient.put(`${this.apiUrl}/updateRole/${roleId}`, params);
  }
}
