import { Component, OnInit } from '@angular/core';
import { MenagerService } from '../menager.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Signin } from '../../Models/menager/signin.model';

@Component({
  selector: 'app-register-in',
  templateUrl: './register-in.component.html',
  styleUrl: './register-in.component.scss'
})
export class RegisterInComponent implements OnInit {

  registerMenager: FormGroup;
  menager: Signin;

  public login() {
    this._router.navigate(['/menager/login']);
  }

  public save() {
    let timerInterval;
    this.menager = this.registerMenager.value;
    console.log("save", this.menager);

    if (this.menager.kind == 1)
      this.menager.kind = 1;
    else
      this.menager.kind = 2;

    this._menagerService.signIn(this.menager).catch((err) => {
      Swal.fire({
        title: `Oh ${this.menager.firstName}`,
        text: "name and passeword had already been please change",
        icon: "error"
      });
    }).then((data) =>
    // improve
      Swal.fire({
        title: `Hello ${this.menager.firstName}`,
        html: "load.. ",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
        console.log(data);
        this._router.navigate([``]);
      }))
  }

  public close() {
    this._router.navigate([`home`]);
  }

  constructor(private _menagerService: MenagerService, private _router: Router) { }

  ngOnInit(): void {

    this.registerMenager = new FormGroup({
      'id': new FormControl(0),
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      'userName': new FormControl("", Validators.required),
      'addres': new FormControl("", Validators.required),
      'password': new FormControl("", [Validators.required, Validators.minLength(5)]),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'identity': new FormControl("", [Validators.required]),
      'stratDate': new FormControl(new Date(), [Validators.required]),
      'dateOfBirth': new FormControl("", [Validators.required]),
      'kind': new FormControl(0, [Validators.required]),
    });
  }

}
