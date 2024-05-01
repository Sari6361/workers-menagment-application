import { Injectable } from '@angular/core';
import { Worker_ } from '../Models/worker/worker.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { workerModel } from '../Models/worker/WorkerModel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  name = sessionStorage.getItem("userName");
  header = new HttpHeaders().set("Authorization", sessionStorage.getItem(`${this.name}Token`));


  public getWorkers(menagerId: number): Observable<Worker_[]> {
    return this._http.get<Worker_[]>(`https://localhost:7141/api/Employee/${menagerId}/${true}`, { 'headers': this.header })
  }

  public add(worker: Worker_): Observable<Worker_> {
    return this._http.post<Worker_>(`https://localhost:7141/api/Employee`, worker,{ 'headers': this.header });
  }

  public update(worker: workerModel): Observable<Worker_> {
    return this._http.put<Worker_>(`https://localhost:7141/api/Employee/${worker.id}`, worker, { 'headers': this.header });
  }

  public updateStatus(id: number, status: boolean): Observable<Worker_> {
    return this._http.put<Worker_>(`https://localhost:7141/api/Employee/${id}/${status}`,"", { 'headers': this.header });
  }

  constructor(private _http: HttpClient) { }

}
