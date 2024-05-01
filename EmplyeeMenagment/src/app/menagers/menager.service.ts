import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../Models/menager/login.model';
import { Signin } from '../Models/menager/signin.model';
import { Observable } from 'rxjs';
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
      if (sessionStorage.getItem("userId"))
        this.id = Number(sessionStorage.getItem("userId"));
      console.log("verify", this.id);
    }
  }

  public signIn(user: Signin): Promise<any> {
    return new Promise((res, rej) => {
      this._http.post(`https://localhost:7141/api/Menager/signin`, user).subscribe({
        next: (data: any) => {
          this.keepToken(data.token, JSON.stringify(data.Menager_), user.userName, data.Menager_.id);
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
          this.keepToken(data.token, JSON.stringify(data.menager_), user.userName, data.menager_.id);
          res(data);
        },
        error: (err) => {
          rej(err.error)
        }
      });
    })
  }


  public menager(): Observable<Menager> {
    this.verify();
    return this._http.get<Menager>(`https://localhost:7141/api/Menager/${this.id}`, { 'headers': this.header });
  }


  public workers(): Observable<Worker_[]> {
    this.verify();
    return this._http.get<Worker_[]>(`https://localhost:7141/api/Menager/${this.id}/workers`, { 'headers': this.header });
  }

  public logOut(): void {
    if (typeof window !== 'undefined') {
      var name = sessionStorage?.getItem("userName");
      sessionStorage?.setItem(`${name}Token`, "");
      sessionStorage?.setItem("userName", "");
    }
  }


  private keepToken(data: String, menager: string, name: String, id: number) {
    if (typeof window !== 'undefined') {
      sessionStorage?.setItem(`${name}Token`, 'Bearer ' + data);
      sessionStorage?.setItem(`menager`, menager);
      sessionStorage?.setItem("userName", "" + name);
      sessionStorage?.setItem("userId", "" + id);
    }
  }

  constructor(private _http: HttpClient) { }

}
