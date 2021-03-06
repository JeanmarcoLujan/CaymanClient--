import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  applicationList$!: Observable<any[]>;
  readonly inspectionAPIUrl = environment.baseUrl;
  
  constructor(private service: CaymanAPIService) { }

  ngOnInit(): void {
    this.applicationList$ = this.service.getAll(this.inspectionAPIUrl + '/Application'); 
  }


}
