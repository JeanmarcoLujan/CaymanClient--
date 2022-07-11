import { Component, OnInit } from '@angular/core';
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
  
  

  constructor(private service: CaymanAPIService) { }

  ngOnInit(): void {
    this.solicitudList$ = this.service.getAll(this.inspectionAPIUrl + '/Application'); 
    this.service.getAll(this.inspectionAPIUrl + '/Application')
    .subscribe(a=>{
      console.log(a)
    }); 
  }

}
