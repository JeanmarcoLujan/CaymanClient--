import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application-approval',
  templateUrl: './application-approval.component.html',
  styleUrls: ['./application-approval.component.css']
})
export class ApplicationApprovalComponent implements OnInit {

  solicitudList$!: Observable<any[]>;
  readonly inspectionAPIUrl = environment.baseUrl;
  
  constructor(private service: CaymanAPIService) { }

  ngOnInit(): void {
    this.solicitudList$ = this.service.getAll(this.inspectionAPIUrl + '/Application/approval');
  }

}
