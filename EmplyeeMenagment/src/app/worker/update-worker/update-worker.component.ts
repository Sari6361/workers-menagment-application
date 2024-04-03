import { Component, Input, Output, booleanAttribute } from '@angular/core';
import { Worker_ } from '../../Models/worker/worker.model';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { WorkerService } from '../worker.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-update-worker',
  templateUrl: './update-worker.component.html',
  styleUrl: './update-worker.component.scss'
})
export class UpdateWorkerComponent {

  @Input()
  worker:Worker_;


  public workerForm: FormGroup;
  workerToAdd: Worker_;

  public save() {

    this.workerToAdd = this.workerForm.value;

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
        this._workerService.add(this.workerToAdd).subscribe({
          next:(data)=>{
            Swal.fire(`${data.firstName} worker added successfully!`, "", "success");
            this._router.navigate([``]);
          },
          error:(err)=>{
            console.log("add",err);
          // check wich error
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
      'name': new FormControl("", Validators.required),
      'menagment': new FormControl(false, Validators.required),
      'stratDate': new FormControl(new Date(), Validators.required),
    });
  }

  public close(){
  }


  constructor(private _router: Router, private _workerService: WorkerService, private _fromBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.workerForm = this._fromBuilder.group({
      'id': new FormControl(0),
      'firstName': new FormControl(this.worker.id, Validators.required),
      'lastName': new FormControl(this.worker.firstName, Validators.required),
      'identity': new FormControl(this.worker.identity, [Validators.required]),
      'addres': new FormControl(this.worker.adress, Validators.required),
      'email': new FormControl(this.worker.email, [Validators.required, Validators.email]),
      'kind': new FormControl(this.worker.kind, [Validators.required]),
      'status': new FormControl(this.worker.status, Validators.required),
      'stratDate': new FormControl(this.worker.startDate, [Validators.required]),
      'dateOfBirth': new FormControl(this.worker.dateOfBirth, [Validators.required]),
      'roles': this._fromBuilder.array(this.worker.roles)
    });
  }

}
