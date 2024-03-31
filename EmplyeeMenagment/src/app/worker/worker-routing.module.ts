import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../base-pages/not-found/not-found.component';
import { AddWorkerComponent } from './add-worker/add-worker.component';
import { AllWorkersComponent } from './all-workers/all-workers.component';

const routes: Routes = [
  {path:"add", component:AddWorkerComponent},
  {path:"all", component:AllWorkersComponent},
  // {path:"edit", component:AddEditWorkerComponent},
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule { }
