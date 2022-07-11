import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  customer$!: any;
  readonly inspectionAPIUrl = environment.baseUrl;

  step: any = 1;
  myDate = new Date();

  firstFormGroup!: FormGroup;

  constructor(private service: CaymanAPIService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCreditProducts();
    this.getAssurances();
    this.getCustomer();

    this.firstFormGroup = this._formBuilder.group({
      customerId: [0, Validators.required],
      salary: ['', Validators.required],
      productId: [0, Validators.required],
      amount: ['', Validators.required],
      creditProductId: [0, Validators.required],
      assuranceId: [0, Validators.required],
      requestAmount: ['', Validators.required],
      procedureCost: ['', Validators.required],
      insuranceCost: ['', Validators.required],
      numberFees: ['', Validators.required],
      initialFee: ['', Validators.required],
      interestRate: ['', Validators.required],
      amountFee: ['', Validators.required]
    });
  }


  next(): void{
    this.step = this.step+1;
  }

  previous():void{
    this.step = this.step-1;
  }

  submit() {
    
    this.service.post(this.inspectionAPIUrl + '/Application', this.firstFormGroup.value)
    .subscribe(
      response => {
        console.log(response);        
      },
      error => {
        console.log(error);
      });
      
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

  getCustomer():void{
    this.service.getAll(this.inspectionAPIUrl + '/Customer/ordered')
    .subscribe(a=> {
      this.customer$ = a;
    });
  }

}
