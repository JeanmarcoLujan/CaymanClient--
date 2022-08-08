import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  personTypes$!: any;
  readonly inspectionAPIUrl = environment.baseUrl;

  step: any = 1;
  nameFound: any;
  person: any = {
    documentType: 0,
    personType: 0,
    documentNumber: ''
  }


  firstFormGroup!: FormGroup;

  constructor(
    private service: CaymanAPIService, 
    private _formBuilder: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    this.step = 1;
    this.getDocTypes();
    this.getDeparments();
    this.getCivils();
    this.getEducations();
    this.getPersonTypes();

    this.firstFormGroup = this._formBuilder.group({
      docTypeId: [0, Validators.required],
      numDoc: ['', Validators.required],
      nameDoc: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      districtId: [0, Validators.required],
      address: ['', Validators.required],
      civilId: [0, Validators.required],
      educationId: [0, Validators.required],
      ruc: ['', Validators.required],
      nameRuc: ['', Validators.required],
      addressRuc: ['', Validators.required],
      personTypeId: [0, Validators.required]
    });
  }

  next(): void {
    this.step = this.step + 1;
  }

  previous(): void {
    this.step = this.step - 1;
  }

  submit() {

    if (this.firstFormGroup.valid) {
      this.service.post(this.inspectionAPIUrl + '/Customer', this.firstFormGroup.value)
        .subscribe(
          response => {
            this.router.navigate(['/cliente']);
          },
          error => {
            console.log(error);
          });
    } else {
      alert("Por favor, asegurese de registrar todos los campos")
    }
  }

  foundCustomer(): void {
    const data = {
      personType: this.person.personType,
      documentType: this.person.documentType,
      documentNumber : this.person.documentNumber
    }

    //console.log(data);
 
    this.service.post(this.inspectionAPIUrl + '/Equifax', data)
      .subscribe(
        data => {
          this.nameFound = data.body;
          this.nameFound = this.nameFound.names
          
        }

      );
  }

  getDocTypes(): void {
    this.service.getAll(this.inspectionAPIUrl + '/DocType')
      .subscribe(a => {
        this.docTypes$ = a;
      });
  }

  getDeparments(): void {
    this.service.getAll(this.inspectionAPIUrl + '/Deparment')
      .subscribe(a => {
        this.departments$ = a;
      });
  }

  getProvinces(id: any): void {
    this.service.getAll(this.inspectionAPIUrl + '/Province/' + id.value)
      .subscribe(a => {
        this.provinces$ = a;
      });
  }

  getDistricts(id: any): void {
    this.service.getAll(this.inspectionAPIUrl + '/District/' + id.value)
      .subscribe(a => {
        this.districts$ = a;
      });
  }

  getCivils(): void {
    this.service.getAll(this.inspectionAPIUrl + '/Civil')
      .subscribe(a => {
        this.civils$ = a;
      });
  }

  getPersonTypes(): void {
    this.service.getAll(this.inspectionAPIUrl + '/PersonType')
      .subscribe(a => {
        this.personTypes$ = a;
      });
  }

  getEducations(): void {
    this.service.getAll(this.inspectionAPIUrl + '/Education')
      .subscribe(a => {
        this.educations$ = a;
      });
  }




}
