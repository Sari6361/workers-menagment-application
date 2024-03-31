import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LogInComponent } from './log-in/log-in.component';
import { RegisterInComponent } from './register-in/register-in.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MenagersRoutingModule } from './menagers-routing.module';
import { MenagerService } from './menager.service';
import { WorkerService } from '../worker/worker.service';

@NgModule({
  declarations: [LogInComponent,RegisterInComponent, UpdateProfileComponent ],
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule, MenagersRoutingModule ],
  providers:[MenagerService, WorkerService],
})
export class MenagersModule { }
