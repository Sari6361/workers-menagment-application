import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasePagesModule } from './base-pages/base-pages.module';
import { MenagersModule } from './menagers/menagers.module';
import { HeaderComponent } from "./base-pages/header/header.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule,
    BasePagesModule, MenagersModule]
})
export class AppComponent {
  title = 'EmplyeeMenagment';
}
