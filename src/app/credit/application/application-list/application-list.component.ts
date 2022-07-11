import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  solicitudList$!: Observable<any[]>;
  readonly inspectionAPIUrl = environment.baseUrl;



  constructor(private service: CaymanAPIService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.solicitudList$ = this.service.getAll(this.inspectionAPIUrl + '/Application');

  }

  inspection(id: any): void {
    const data = {
      id: id,
      userId: this.cookieService.get('userId'),
      state: 1
    }

    var opcion = confirm("Está solicitud, pasara a inspeccionarse, ¿de acuerdo?");
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
