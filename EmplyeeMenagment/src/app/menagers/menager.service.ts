import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../Models/menager/login.model';
import { Signin } from '../Models/menager/signin.model';
import { Observable, retry } from 'rxjs';
import { Menager } from '../Models/menager/menager.model';
import { Worker_ } from '../Models/worker/worker.model';


@Injectable({
  providedIn: 'root'
})
export class MenagerService {

  private id: number;
  private header: HttpHeaders;

  verify() {
    if (sessionStorage.getItem("userName") != null) {
      var name = sessionStorage.getItem("userName");
      if (sessionStorage.getItem(`${name}Token`))
        this.header = new HttpHeaders().set("Authorization", sessionStorage?.getItem(`${name}Token`));
    }
  }

  public signIn(user: Signin): Promise<any> {
    return new Promise((res, rej) => {
      this._http.post(`https://localhost:7141/api/Menager/signin`, user).subscribe({
        next: (data: any) => {
          this.keepToken(data.token, JSON.stringify(data.Menager_), user.userName);
          this.id = data.Menager_.id;
          this.workers = data.Menager_.workers;
          console.log("workers from menGER SERVICE sign in", this.workers);
          this.verify();
          res(data.menager_);
        },
        error: (err) => {
          console.log("put", err);
          rej(err.error)
        }
      })
    })
  }

  public logIn(user: LoginModel): Promise<any> {
    return new Promise((res, rej) => {
      this._http.post(`https://localhost:7141/api/Menager/login`, user).subscribe({
        next: (data: any) => {
          this.keepToken(data.token, JSON.stringify(data.menager_), user.userName);
          this.id = data.menager_.id;
          console.log("log in id", this.id);

          this.verify();
          res(data);
        },
        error: (err) => {
          console.log("post error", err);
          rej(err.error)
        }
      });
    })
  }


  public menager(): Observable<Menager> {
    console.log("get menager", this.id, this.header);

    return this._http.get<Menager>(`https://localhost:7141/api/Menager/${this.id}`, { 'headers': this.header });
  }


  public workers(): Observable<Worker_[]> {
    return this._http.get<Worker_[]>(`https://localhost:7141/api/Menager/workers/${this.id}`, { 'headers': this.header });
  }


  public addWorker(worker: Worker_): Promise<Menager> {

    this.menager().subscribe({
      next: (data) => {
        console.log("add after get menager", data);

        data.workers.push(worker);

        return new Promise((res, rej) => {
          this._http.put(`https://localhost:7141/api/Menager/${this.id}`, data, { 'headers': this.header }).subscribe({
            next: (data: any) => {
              res(data);
            },
            error: (err) => {
              console.log("post error", err);
              rej(err.error)
            }
          })
        })

      }, error: (err) => console.log(err)
    });
    return new Error();

    // return new Promise("error occourd in connecting to db"));
  }


  public logOut(): void {
    if (typeof window !== 'undefined') {
      var name = sessionStorage?.getItem("userName");
      sessionStorage?.setItem(`${name}Token`, "");
      console.log("after service");
    }
  }


  private keepToken(data: String, menager: string, name: String) {
    if (typeof window !== 'undefined') {
      console.log("data:", data);
      sessionStorage?.setItem(`${name}Token`, 'Bearer ' + data);
      sessionStorage?.setItem(`menager`, menager);
      sessionStorage?.setItem("userName", "" + name);
    }
  }


  constructor(private _http: HttpClient) { }

}
