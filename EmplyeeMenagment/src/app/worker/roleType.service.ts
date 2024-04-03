import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleType } from '../Models/rolesType/roleType.model';

@Injectable({
    providedIn: 'root'
})
export class RoleTypeService {

    name = sessionStorage.getItem("userName");
    header = new HttpHeaders().set("Authorization", sessionStorage.getItem(`${this.name}Token`));


    public getRolesType(): Observable<RoleType[]> {
        return this._http.get<RoleType[]>(`https://localhost:7141/api/RoleType`, { 'headers': this.header })
    }
    public getRoleById(id:number): Observable<RoleType> {
        return this._http.get<RoleType>(`https://localhost:7141/api/RoleType/${id}`, { 'headers': this.header })
    }

    constructor(private _http: HttpClient) { }

}
