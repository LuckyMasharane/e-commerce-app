import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResetpasswordPage } from './resetpassword.page';

const routes: Routes = [
  {
    path: '',
    component: ResetpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
})
export class ResetpasswordPageRoutingModule { }
