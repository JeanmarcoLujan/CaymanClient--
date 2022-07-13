import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application-update-modal',
  templateUrl: './application-update-modal.component.html',
  styleUrls: ['./application-update-modal.component.css']
})
export class ApplicationUpdateModalComponent implements OnInit {

  userList$!: any;
  readonly inspectionAPIUrl = environment.baseUrl;

  firstFormGroup!: FormGroup;
  
  constructor(
    private service: CaymanAPIService,
    private _formBuilder: FormBuilder, 
    public matdialogref: MatDialogRef<ApplicationUpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getUser();

    this.firstFormGroup = this._formBuilder.group({
      id: [this.data.id, Validators.required],
      state: [this.data.state, Validators.required],
      userId: [0, Validators.required]
    });
  }

  getUser(): void {

    const dataU={
      typeRol:["3"]
    }

    this.service.post(this.inspectionAPIUrl + '/User/Rol',dataU)
    .subscribe(a => {
      console.log(a);
      this.userList$ = a.body;
    });

  }


  submit(){
    if (this.firstFormGroup.valid) {
      this.service.putInModal(this.inspectionAPIUrl + '/Application/'+this.data.id, this.firstFormGroup.value)
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
