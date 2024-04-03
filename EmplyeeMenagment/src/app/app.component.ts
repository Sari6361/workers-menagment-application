import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasePagesModule } from './base-pages/base-pages.module';
import { MenagersModule } from './menagers/menagers.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenagerService } from './menagers/menager.service';
import { WorkerService } from './worker/worker.service';
import { RoleTypeService } from './worker/roleType.service';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule,
    BasePagesModule, MenagersModule],
    providers:[MenagerService, WorkerService,RoleTypeService],
})
export class AppComponent {
  title = 'EmplyeeMenagment';
}
