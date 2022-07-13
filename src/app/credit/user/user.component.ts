import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList$!: Observable<any[]>;
  readonly inspectionAPIUrl = environment.baseUrl;

  constructor(private service: CaymanAPIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userList$ = this.service.getAll(this.inspectionAPIUrl + '/User');
    this.service.requiredRefresh.subscribe(r => {
      this.userList$ = this.service.getAll(this.inspectionAPIUrl + '/User');
    });
  }

  update(id: any) {
    this.openDialog("1000ms", "500ms", id);
  }

  openDialog(enteranimation: any, exitanimation: any, id: any) {
    this.dialog.open(UserModalComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
      data: {
        id: id
      }
    });
  }

  delete(id: any) {
    var opcion = confirm("¿Esta Ud. seguro de eliminar el registro?");
    if (opcion == true) {
      this.service.delete(this.inspectionAPIUrl + '/User/'+id)
      .subscribe(
        response => {
          this.userList$ = this.service.getAll(this.inspectionAPIUrl + '/User');
        });
    } 
  }

}
