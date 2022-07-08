import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { CustomerComponent } from './customer/customer.component';
import { AreaComponent } from './area/area.component';
import { AuthGuard } from '../guards/auth.guard';
import { InspectionComponent } from './inspection/inspection.component';
import { ApprovalComponent } from './approval/approval.component';
import { ApplicationComponent } from './application/application.component';

const routes:Routes=[
  {path:'credito', component:CreditComponent, canActivate:[AuthGuard], 
  children:[
    {path: '', component: CreditComponent },
    {path: 'usuario', component: UserComponent},
    {path: 'rol', component: RoleComponent},
    {path: 'area', component: AreaComponent},
    {path: 'cliente', component: CustomerComponent},
    {path: 'inspeccion', component: InspectionComponent},
    {path: 'aprobacion', component: ApprovalComponent},
    {path: 'solicitud', component: ApplicationComponent}

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
