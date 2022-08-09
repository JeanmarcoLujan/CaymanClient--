import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-show',
  templateUrl: './customer-show.component.html',
  styleUrls: ['./customer-show.component.css']
})
export class CustomerShowComponent implements OnInit {

  readonly inspectionAPIUrl = environment.baseUrl;
  customer!: any;
  
  constructor(private route: ActivatedRoute, private service: CaymanAPIService) { }

  ngOnInit(): void {
    this.getCustomer(this.route.snapshot.paramMap.get('id'));

  }

  getCustomer(id: any):void{
    this.service.getAll(this.inspectionAPIUrl + '/Customer/'+id)
    .subscribe(a=>{
      this.customer = a;
    });
  }

}
