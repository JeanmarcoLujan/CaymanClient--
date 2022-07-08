import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GeneralComponent,
    DasboardComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule, 
    RouterModule
  ]
})
export class GeneralModule { }
