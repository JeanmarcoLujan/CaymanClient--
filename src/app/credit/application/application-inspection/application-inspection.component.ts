import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application-inspection',
  templateUrl: './application-inspection.component.html',
  styleUrls: ['./application-inspection.component.css']
})
export class ApplicationInspectionComponent implements OnInit {

  solicitudList$!: Observable<any[]>;
  readonly inspectionAPIUrl = environment.baseUrl;
  
  constructor(private service: CaymanAPIService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.solicitudList$ = this.service.getAll(this.inspectionAPIUrl + '/Application/inspection'); 
    
  }

  approval(id: any):void{
    const data = {
      id: id,
      userId: this.cookieService.get('userId'),
      state: 2
    }

    var opcion = confirm("¿Está Ud. seguro de aprobar esta solicitud?");
    if (opcion == true) {
      this.service.put(this.inspectionAPIUrl + '/Application/' + id, data)
      .subscribe(
        response => {
          this.solicitudList$ = this.service.getAll(this.inspectionAPIUrl + '/Application');     
        },
        error => {
          console.log(error);
        });
    } 
  }

}
