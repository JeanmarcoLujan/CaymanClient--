import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationCreateComponent } from './application-create/application-create.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationApprovalComponent } from './application-approval/application-approval.component';
import { ApplicationInspectionComponent } from './application-inspection/application-inspection.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ApplicationCreateComponent,
    ApplicationListComponent,
    ApplicationApprovalComponent,
    ApplicationInspectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule
  ]
})
export class ApplicationModule { }
