import {   Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { MenagerService } from '../../menagers/menager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
   styleUrl: './header.component.scss',
})

export class HeaderComponent implements OnInit {

  connected: boolean;

  toHomePage() {
    this._router.navigate(['home']);
  }

  addWorker() {
    this._router.navigate(['worker/add']);
  }

  allWorkers() {
    this._router.navigate(['worker/all']);
  }

  toLogin() {
    this._router.navigate(['menager/login']);
  }

  updateProfile() {
    this._router.navigate(['menager/update']);
  }

  toRegisterIn() {
    this._router.navigate(['menager/signin'])
  }

  toLogout() {
    Swal.fire({
      title: "Are you sure you want to exit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Good-Bay!",
          text: "we will be happay to meet you again.",
        });
        this._menagerService.logOut();
        this.connected = false;
        this._router.navigate([''])

      }
    });

    // this._menagerService.logOut();
    // this.connected = false;
    // this._router.navigate(['/'])
  }

  constructor(private _router: Router, private _menagerService: MenagerService) { }
  ngOnInit(): void {
    if (window && window.sessionStorage && sessionStorage.getItem("userName"))
      var name = sessionStorage.getItem("userName");
    if (window && window.sessionStorage && sessionStorage.getItem(`${name}Token`))
      this.connected = true;
  }


}
