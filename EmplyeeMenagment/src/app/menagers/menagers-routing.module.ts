import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterInComponent } from './register-in/register-in.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { NotFoundComponent } from '../base-pages/not-found/not-found.component';

const routes: Routes = [
  {path:`login`, component:LogInComponent},
  {path:"signin", component:RegisterInComponent},
  {path:"update",component:UpdateProfileComponent},
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenagersRoutingModule { }
