import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general.component';
import { DasboardComponent } from './dasboard/dasboard.component';



@NgModule({
  declarations: [
    GeneralComponent,
    DasboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GeneralModule { }
