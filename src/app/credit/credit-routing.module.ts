import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { CustomerComponent } from './customer/customer.component';
import { AreaComponent } from './area/area.component';

const routes:Routes=[
  {path:'credito', component:CreditComponent, 
  children:[
    {path: '', component: CreditComponent },
    {path: 'usuario', component: UserComponent},
    {path: 'rol', component: RoleComponent},
    {path: 'area', component: AreaComponent},
    {path: 'cliente', component: CustomerComponent}

  ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class CreditRoutingModule { }
