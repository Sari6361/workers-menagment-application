import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { AddWorkerComponent } from './add-worker/add-worker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllWorkersComponent } from './all-workers/all-workers.component';
import { UpdateWorkerComponent } from './update-worker/update-worker.component';


@NgModule({
  declarations: [AddWorkerComponent, AllWorkersComponent, UpdateWorkerComponent],
  imports: [
    CommonModule,ReactiveFormsModule, FormsModule, HttpClientModule,
    WorkerRoutingModule
  ],
})
export class WorkerModule { }
 