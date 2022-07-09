import { Component, OnInit } from '@angular/core';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  docTypes$!: any;
  readonly inspectionAPIUrl = environment.baseUrl;

  constructor(private service: CaymanAPIService) { }

  ngOnInit(): void {
    this.service.getAll(this.inspectionAPIUrl + '/Customer'); 
  }

}
