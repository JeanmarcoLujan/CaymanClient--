import { Component, OnInit } from '@angular/core';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {

  products$!: any;
  creditProducts$!: any;
  assurances$!: any;
  readonly inspectionAPIUrl = environment.baseUrl;

  constructor(private service: CaymanAPIService) { }

  ngOnInit(): void {
    this.getProducts();
    this.creditProducts$();
    this.getAssurances();

  }

  getProducts():void{
    this.service.getAll(this.inspectionAPIUrl + '/Product')
    .subscribe(a=> {
      this.products$ = a;
    });
  }

  getCreditProducts():void{
    this.service.getAll(this.inspectionAPIUrl + '/CreditProduct')
    .subscribe(a=> {
      this.creditProducts$ = a;
    });
  }

  getAssurances():void{
    this.service.getAll(this.inspectionAPIUrl + '/Assurance')
    .subscribe(a=> {
      this.assurances$ = a;
    });
  }

}
