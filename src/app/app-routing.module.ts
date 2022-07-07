import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { CreditRoutingModule } from './credit/credit-routing.module';
import { GeneralRoutingModule } from './general/general-routing.module';

const routes: Routes=[
  {path: '', redirectTo:'/login', pathMatch:'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    CreditRoutingModule,
    GeneralRoutingModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
