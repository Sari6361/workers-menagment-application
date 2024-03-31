import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { AddWorkerComponent } from './add-worker/add-worker.component';
import { WorkerService } from './worker.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllWorkersComponent } from './all-workers/all-workers.component';
import { MenagerService } from '../menagers/menager.service';


@NgModule({
  declarations: [AddWorkerComponent, AllWorkersComponent],
  imports: [
    CommonModule,ReactiveFormsModule, FormsModule, HttpClientModule,
    WorkerRoutingModule
  ],
  providers:[WorkerService, MenagerService]
})
export class WorkerModule { }
 