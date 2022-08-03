import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  areas$!: any;
  roles$!: any;
  editData: any;
  readonly inspectionAPIUrl = environment.baseUrl;

  firstFormGroup!: FormGroup;
  updating: boolean = false;

  constructor(
    private service: CaymanAPIService, 
    private _formBuilder: FormBuilder, 
    public matdialogref: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getArea();
    this.getRoles();

    this.firstFormGroup = this._formBuilder.group({
      id: [0, Validators.required],
      nickName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [0, Validators.required],
      areaId: [0, Validators.required]
    });

    if(this.data.id != null && this.data.id != ''){
      console.log("ingreso")
      this.loadEditData(this.data.id);
      this.updating = true;
    }

  }

  getArea(): void {
    this.service.getAll(this.inspectionAPIUrl + '/Area')
      .subscribe(a => {
        this.areas$ = a;
      });
  }

  getRoles(): void {
    this.service.getAll(this.inspectionAPIUrl + '/Role')
      .subscribe(a => {
        this.roles$ = a;
      });
  }

  submit(){

    if(this.data.id != null && this.data.id != ''){
      if (this.firstFormGroup.valid) {
        this.service.putInModal(this.inspectionAPIUrl + '/User/'+this.data.id, this.firstFormGroup.value)
          .subscribe(
            response => {
              this.matdialogref.close();
            },
            error => {
              console.log(error);
            });
      } else {
        alert("Por favor, asegurese de registrar todos los campos")
      }

    }else{
      if (this.firstFormGroup.valid) {
        this.service.postInModal(this.inspectionAPIUrl + '/User', this.firstFormGroup.value)
          .subscribe(
            response => {
              this.matdialogref.close();
            },
            error => {
              console.log(error);
            });
      } else {
        alert("Por favor, asegurese de registrar todos los campos")
      }
    }
 
  }

  loadEditData(data:any){
    this.service.getById(this.inspectionAPIUrl + '/User/'+data).
    subscribe(a=>{
      this.editData = a;
      this.firstFormGroup.setValue(
        {
          id: this.editData.id,
          nickName: this.editData.nickName,
          name: this.editData.name,
          email: this.editData.email,
          password: this.editData.password,
          roleId: this.editData.roleId,
          areaId: this.editData.areaId
        }
      );
    });
  }


}
