import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerService } from '../worker.service';
import Swal from 'sweetalert2';
import { Worker_ } from '../../Models/worker/worker.model';
import { RoleType } from '../../Models/rolesType/roleType.model';
import { RoleTypeService } from '../roleType.service';
import { DateValidator } from '../validation';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrl: './add-worker.component.scss'
})
export class AddWorkerComponent implements OnInit {

  worker: FormGroup;
  workerToAdd: Worker_;
  rolesType: RoleType[];
  rolesTypeSelected: number[] = [-1];
  menagerId: number;
  public save() {
    this.workerToAdd = this.worker.value;
    this.workerToAdd.kind = Number(this.workerToAdd.kind);
    this.workerToAdd.roles.forEach(r => r.roleTypeId = Number(r.roleTypeId))

    console.log("add worker", this.workerToAdd);
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this._workerService.add(this.workerToAdd).subscribe({
          next: (data) => {
            Swal.fire(data.firstName + " added successfully!", "", "success");
            this._router.navigate([`/`]);
          },
          error: (err) => {
            console.log("add", err);

            //check if error equals to exit??? 
            Swal.fire({
              title: `Oh ${this.workerToAdd.firstName}`,
              text: "error in saving worker please try agsain letaer",
              icon: "error"
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  roles(): FormArray {
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
      'roleTypeId': new FormControl(0, Validators.required),
      'menagment': new FormControl(false, Validators.required),
      'stratDate': new FormControl(new Date(), Validators.required),
    });
  }

  pushRole(i: any) {
    this.rolesTypeSelected.push(Number(i));
  }

  checkRoleExit(i: number): boolean {
    for (const role of this.rolesTypeSelected) {
      if (role == i)
        return true;
    }
    return false;
  }


  public close() {
    this._router.navigate([`home`]);
  }

  constructor(private _router: Router, private _workerService: WorkerService, private _roleTypeService: RoleTypeService, private _fromBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.worker = this._fromBuilder.group({
      'id': new FormControl(0),
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      'identity': new FormControl("", [Validators.required]),
      'address': new FormControl("", Validators.required),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'kind': new FormControl(0, [Validators.required]),
      'status': new FormControl(true, Validators.required),
      'stratDate': new FormControl(new Date(), [Validators.required, DateValidator]),
      'dateOfBirth': new FormControl("", [Validators.required, DateValidator]),
      'roles': this._fromBuilder.array([]),
      'menagerId': new FormControl(Number(sessionStorage.getItem("userId")))
    });

    this._roleTypeService.getRolesType().subscribe({
      next: (data) => {
        console.log("roles", data);

        this.rolesType = data;
      },
      error: (err) => console.log("error in get roles type", err)
    })
  }

}
