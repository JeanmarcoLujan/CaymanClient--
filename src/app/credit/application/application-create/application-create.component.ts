import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  customer:any ={
    id:0
  }

  score_crediticio:any = 0;
  customer_crediticio: any='';

  constructor(private service: CaymanAPIService, private _formBuilder: FormBuilder, private router: Router) { }

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

  findScore(da: any): void{
    const data={
      customerId: da.value
    }
    this.service.post(this.inspectionAPIUrl + '/Equifax/byCustomerId', data)
    .subscribe(
      data => {
      
        this.score_crediticio = data.body;  
        this.score_crediticio = this.score_crediticio.puntaje;
        this.customer_crediticio = data.body;
        this.customer_crediticio = this.customer_crediticio.names;
        
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
        this.router.navigate(['/solicitud']);       
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
