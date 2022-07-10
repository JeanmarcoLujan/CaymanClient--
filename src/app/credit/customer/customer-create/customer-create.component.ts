import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  docTypes$!: any;
  departments$!: any;
  provinces$!: any;
  districts$!: any;
  civils$!: any;
  educations$!: any;
  readonly inspectionAPIUrl = environment.baseUrl;

 

  firstFormGroup!: FormGroup;

  constructor(private service: CaymanAPIService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getDocTypes();
    this.getDeparments();
    this.getCivils();
    this.getEducations();
    this.firstFormGroup = this._formBuilder.group({
      docTypeId: ['', Validators.required],
      numDoc: ['', Validators.required],
      nameDoc: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      districtId: ['', Validators.required],
      address: ['', Validators.required],
      civilId: ['', Validators.required],
      educationId: ['', Validators.required],
      ruc: ['', Validators.required],
      nameRuc: ['', Validators.required],
      addressRuc: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.firstFormGroup.value);
    this.service.post(this.inspectionAPIUrl + '/Customer', this.firstFormGroup.value)
    .subscribe(
      response => {
        console.log(response);        
        //this.router.navigate(['/inspeccion']);
      },
      error => {
        console.log(error);
      });
  }


  getDocTypes():void{
    this.service.getAll(this.inspectionAPIUrl + '/DocType')
    .subscribe(a=> {
      this.docTypes$ = a;
    });
  }

  getDeparments():void{
    this.service.getAll(this.inspectionAPIUrl + '/Deparment')
    .subscribe(a=> {
      this.departments$ = a;
    });
  }

  getProvinces(id:any):void{
    this.service.getAll(this.inspectionAPIUrl + '/Province/'+id.value)
    .subscribe(a=> {
      this.provinces$ = a;
    });
  }

  getDistricts(id:any):void{
    this.service.getAll(this.inspectionAPIUrl + '/District/'+id.value)
    .subscribe(a=> {
      this.districts$ = a;
    });
  }

  getCivils():void{
    this.service.getAll(this.inspectionAPIUrl + '/Civil')
    .subscribe(a=> {
      this.civils$ = a;
    });
  }

  getEducations():void{
    this.service.getAll(this.inspectionAPIUrl + '/Education')
    .subscribe(a=> {
      this.educations$ = a;
    });
  }


 

}
