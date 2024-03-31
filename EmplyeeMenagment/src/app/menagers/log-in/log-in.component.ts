import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../Models/menager/login.model';
import { MenagerService } from '../menager.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {

  userLogin: FormGroup;
  private _user: LoginModel;
  

  public logIn() {
    this._user= this.userLogin.value;
    
    this._menagerService.logIn(this._user).then((data) => {
      console.log(data);
      this._router.navigate([`/`]);
    });
  }

  public signin() {
    this._router.navigate([`menager/signin`]);
  }

  constructor(private _router: Router, private _menagerService: MenagerService) { }

  ngOnInit(): void {
    this.userLogin = new FormGroup({
      'password': new FormControl('', [Validators.required]),
      'userName': new FormControl('', [Validators.required]),
    });
  }
}
