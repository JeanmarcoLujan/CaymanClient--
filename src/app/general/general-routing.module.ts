import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './dasboard/dasboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes=[
  {path: 'dashboard', component: DasboardComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class GeneralRoutingModule { }
