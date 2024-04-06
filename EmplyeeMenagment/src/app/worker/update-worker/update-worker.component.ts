import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Worker_ } from '../../Models/worker/worker.model';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerService } from '../worker.service';
import { RoleType } from '../../Models/rolesType/roleType.model';
import { RoleTypeService } from '../roleType.service';

@Component({
  selector: 'app-update-worker',
  templateUrl: './update-worker.component.html',
  styleUrl: './update-worker.component.scss'
})
export class UpdateWorkerComponent {

  @Input() worker: Worker_;
  @Output() closeEvent = new EventEmitter<boolean>();
  

  rolesType: RoleType[];
  rolesTypeSelected: number[];
  workerToUpdate: Worker_;

  public workerForm: FormGroup;

  public save() {

    this.workerToUpdate = this.workerForm.value;
    console.log(this.workerToUpdate);
    
    this.workerToUpdate.kind = Number(this.workerToUpdate.kind);
    this.workerToUpdate.roles.forEach(r => r.roleTypeId = Number(r.roleTypeId))

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this._workerService.add(this.workerToUpdate).subscribe({
          next: (data) => {
            Swal.fire(`${data.firstName} worker added successfully!`, "", "success");
            this._router.navigate([``]);
          },
          error: (err) => {
            console.log("add", err);
            // check wich error
            Swal.fire({
              title: `Oh ${this.workerToUpdate.firstName}`,
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
    console.log("roles-",this.workerForm.get('roles') as FormArray);
    return this.workerForm.get('roles') as FormArray;
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

  public close() {
    this.closeEvent.emit(true);
    this.worker = null;
  }


  constructor(private _router: Router, private _workerService: WorkerService, private _roleTypeService: RoleTypeService, private _fromBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.workerForm = this._fromBuilder.group({
      'id': new FormControl(this.worker.id),
      'firstName': new FormControl(this.worker.firstName, Validators.required),
      'lastName': new FormControl(this.worker.lastName, Validators.required),
      'identity': new FormControl(this.worker.identity, [Validators.required]),
      'addres': new FormControl(this.worker.adress, Validators.required),
      'email': new FormControl(this.worker.email, [Validators.required, Validators.email]),
      'stratDate': new FormControl(this.worker.startDate, [Validators.required]),
      'roles': this._fromBuilder.array(this.worker.roles),
      'status': new FormControl(this.worker.status),
      'menagerId': new FormControl(this.worker.menagerId)
    });

    this._roleTypeService.getRolesType().subscribe({
      next: (data) => {
        this.rolesType = data;
      },
      error: (err) => console.log("error in get roles type", err)
    })
  }

}
