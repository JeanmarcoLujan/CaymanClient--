import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';
import { ApplicationUpdateModalComponent } from '../../modals/application-update-modal/application-update-modal.component';

@Component({
  selector: 'app-application-inspection',
  templateUrl: './application-inspection.component.html',
  styleUrls: ['./application-inspection.component.css']
})
export class ApplicationInspectionComponent implements OnInit {

  solicitudList$!: Observable<any[]>;
  readonly inspectionAPIUrl = environment.baseUrl;
  
  constructor(private service: CaymanAPIService, private cookieService: CookieService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.solicitudList$ = this.service.getAll(this.inspectionAPIUrl + '/Application/inspection'); 
    this.service.requiredRefresh.subscribe(r=>{
      this.solicitudList$ = this.service.getAll(this.inspectionAPIUrl + '/Application/inspection');
    });
  }

  approval(id: any):void{
    this.openDialog("1000ms","500ms", id);
  }

  openDialog(enteranimation:any, exitanimation: any, id: any){
    this.dialog.open(ApplicationUpdateModalComponent,{
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
      data: {
        id: id,
        state: 3
      }
    });
  }

}
