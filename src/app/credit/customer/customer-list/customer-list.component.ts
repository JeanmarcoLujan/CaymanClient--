import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList$!: Observable<any[]>;
  readonly inspectionAPIUrl = environment.baseUrl;
  
  constructor(private service: CaymanAPIService) { }

  ngOnInit(): void {
    this.customerList$ = this.service.getAll(this.inspectionAPIUrl + '/Customer'); 
  }

}
