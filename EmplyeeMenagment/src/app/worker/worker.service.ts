import { Injectable } from '@angular/core';
import { Worker_ } from '../Models/worker/worker.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenagerService } from '../menagers/menager.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  name = sessionStorage.getItem("userName");
  header = new HttpHeaders().set("Authorization", sessionStorage.getItem(`${this.name}Token`));

  public getWorkers(): Observable<Worker_[]> {
    return this._menagerService.workers();
  }

  public add(worker: Worker_): Promise<Worker_[]> {
    var menager = this._menagerService.addWorker(worker);
    return new Promise((res, rej) => {
      if (menager)
        menager.then(data => res(data.workers));
    });
  }

  // public update(worker:Worker_):Promise<Worker_[]>{

  // }
  constructor(private _http: HttpClient, private _menagerService: MenagerService) { }

}
