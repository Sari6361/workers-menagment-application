import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LogInComponent } from './log-in/log-in.component';
import { RegisterInComponent } from './register-in/register-in.component';
import { MenagersRoutingModule } from './menagers-routing.module';

@NgModule({
  declarations: [LogInComponent,RegisterInComponent ],
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule, MenagersRoutingModule ],
})
export class MenagersModule { }
