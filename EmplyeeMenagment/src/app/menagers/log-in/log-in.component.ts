import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../Models/menager/login.model';
import { MenagerService } from '../menager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {

  userLogin: FormGroup;
  private _user: LoginModel;


  public logIn() {
    this._user = this.userLogin.value;

    this._menagerService.logIn(this._user).then((data) => {
      
      this._router.navigate([``]);
      Swal.fire({
        title: `Hello ${this._user.userName}`,
        html: "load.. ",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then(() => {
        // document.URL.replaceAll("/menager/login","/home");
        console.log(document.URL);
        document.location.reload();
        // document.write('<META HTTP-EQUIV="REFRESH" >');
      });
    });
  }

  public signin() {
    this._router.navigate([`menager/signin`]);
  }

  public close() {
    this._router.navigate([`home`]);
  }

  constructor(private _router: Router, private _menagerService: MenagerService) { }

  ngOnInit(): void {
    this.userLogin = new FormGroup({
      'password': new FormControl('', [Validators.required]),
      'userName': new FormControl('', [Validators.required]),
    });
  }
}
