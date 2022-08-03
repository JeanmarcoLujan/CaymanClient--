import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList$!: any;
  readonly inspectionAPIUrl = environment.baseUrl;

  displayedColumns = ['id', 'Usuario', 'Nombres y apellidos', 'Correo', 'Acciones'];
  dataSource!: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: CaymanAPIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    /*
    this.userList$ = this.service.getAll(this.inspectionAPIUrl + '/User');
    
    */
    this.getUsers();
    this.service.requiredRefresh.subscribe(r => {
      this.getUsers();
    });

    
  }

  getUsers():void{
    this.service.getAll(this.inspectionAPIUrl + '/User')
    .subscribe(a=>{
      this.dataSource = new MatTableDataSource(a);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });
  }

  applyFilter(filterValue: Event) {
    //console.log(filterValue);
    var  filtro = (filterValue.target as HTMLInputElement).value;
    filtro = filtro.trim(); // Remove whitespace
    filtro = filtro.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filtro;
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
          this.getUsers();
        });
    } 
  }

}
