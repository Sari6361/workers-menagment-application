import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerService } from '../worker.service';
import Swal from 'sweetalert2';
import { Worker_ } from '../../Models/worker/worker.model';
import { retry } from 'rxjs';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrl: './add-worker.component.scss'
})
export class AddWorkerComponent implements OnInit {

  worker: FormGroup;
  workerToAdd: Worker_;

  public save() {

    this.workerToAdd = this.worker.value;

    if (this.workerToAdd.kind == 1)
      this.workerToAdd.kind = 1;
    else
      this.workerToAdd.kind = 2;

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this._workerService.add(this.workerToAdd).catch((err) => {
          Swal.fire({
            title: `Oh ${this.workerToAdd.firstName}`,
            text: "error in saving worker please try agsain letaer",
            icon: "error"
          });
        });

        Swal.fire("added successfully!", "", "success");
        this._router.navigate([`/`]);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  roles(): FormArray {
    console.log("roles",this.worker.get('roles').value);
    return this.worker.get('roles') as FormArray;
  }

  addRole() {
    this.roles().push(this.newRole());
  }

  removeRole(i: number) {
    this.roles().removeAt(i);
  }

  newRole() {
    return this._fromBuilder.group({
      'id': new FormControl(0),
      'name': new FormControl("", Validators.required),
      'menagment': new FormControl(false, Validators.required),
      'stratDate': new FormControl(new Date(), Validators.required),
    });
  }

  constructor(private _router: Router, private _workerService: WorkerService, private _fromBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.worker = this._fromBuilder.group({
      'id': new FormControl(0),
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      'identity': new FormControl("", [Validators.required]),
      'addres': new FormControl("", Validators.required),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'kind': new FormControl(0, [Validators.required]),
      'status': new FormControl(true, Validators.required),
      'stratDate': new FormControl(new Date(), [Validators.required]),
      'dateOfBirth': new FormControl("", [Validators.required]),
      'roles': this._fromBuilder.array([])
    });
  }

}
