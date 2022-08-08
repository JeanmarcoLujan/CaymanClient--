import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})
export class RoleModalComponent implements OnInit {

  readonly inspectionAPIUrl = environment.baseUrl;

  firstFormGroup!: FormGroup;
  updating: boolean = false;
  editData: any;
  
  constructor(private service: CaymanAPIService, 
    private _formBuilder: FormBuilder, 
    public matdialogref: MatDialogRef<RoleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required]
    });

    if(this.data.id != null && this.data.id != ''){

      this.loadEditData(this.data.id);
      this.updating = true;
    }
  }

  submit(){

    if(this.data.id != null && this.data.id != ''){
      if (this.firstFormGroup.valid) {
        this.service.putInModal(this.inspectionAPIUrl + '/Role/'+this.data.id, this.firstFormGroup.value)
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
        this.service.postInModal(this.inspectionAPIUrl + '/Role', this.firstFormGroup.value)
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
    this.service.getById(this.inspectionAPIUrl + '/Role/'+data).
    subscribe(a=>{
      this.editData = a;
      this.firstFormGroup.setValue(
        {
          id: this.editData.id,
          name: this.editData.name
        }
      );
    });
  }

}
