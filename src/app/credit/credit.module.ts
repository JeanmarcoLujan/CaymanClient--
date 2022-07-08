import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditComponent } from './credit.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { AreaComponent } from './area/area.component';
import { CustomerComponent } from './customer/customer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CreditRoutingModule } from './credit-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreditComponent,
    UserComponent,
    RoleComponent,
    AreaComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    CreditRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule
  ]
})
export class CreditModule { }
