import { Routes } from '@angular/router';
import { HomeComponent } from './base-pages/home/home.component';
import { NotFoundComponent } from './base-pages/not-found/not-found.component';

export const routes: Routes = [
    {path:"", redirectTo:"home",pathMatch:"full"},
    {path:"home", component:HomeComponent},
    {path:"menager",loadChildren:()=>import('./menagers/menagers.module').then(m=>m.MenagersModule)},
    {path:"worker", loadChildren:()=>import('./worker/worker.module').then(w=>w.WorkerModule)},
    {path:"**", component:NotFoundComponent}   
];
