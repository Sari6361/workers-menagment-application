import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MenagerService } from '../menagers/menager.service';



@NgModule({
  declarations: [HeaderComponent, HomeComponent, NotFoundComponent],
  imports: [
    CommonModule, RouterModule
  ],
  providers:[MenagerService],
  exports: [HeaderComponent]
})
export class BasePagesModule { }
