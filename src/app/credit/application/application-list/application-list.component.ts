import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';
import { ApplicationUpdateModalComponent } from '../../modals/application-update-modal/application-update-modal.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  solicitudList$!: Observable<any[]>;
  readonly inspectionAPIUrl = environment.baseUrl;

  displayedColumns = ['Nro', 'Cliente', 'Producto', 'ProductoCrediticio', 'Estado', 'Acciones'];
  dataSource!: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private service: CaymanAPIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.solicitudList$ = this.service.getAll(this.inspectionAPIUrl + '/Application');
    this.getApplications();
    this.service.requiredRefresh.subscribe(r=>{
      this.getApplications();
      //this.solicitudList$ = this.service.getAll(this.inspectionAPIUrl + '/Application');
    });

  }

  getApplications():void{
    this.service.getAll(this.inspectionAPIUrl + '/Application')
    .subscribe(a=>{
      this.dataSource = new MatTableDataSource(a);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: Event) {
    var  filtro = (filterValue.target as HTMLInputElement).value;
    filtro = filtro.trim(); // Remove whitespace
    filtro = filtro.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filtro;
  }

  inspection(id: any): void {
    this.openDialog("1000ms","500ms", id);
  }


  openDialog(enteranimation:any, exitanimation: any, id: any){
    this.dialog.open(ApplicationUpdateModalComponent,{
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
      data: {
        id: id,
        state: 2
      }
    });
  }


  delete(id: any) {
    var opcion = confirm("¿Esta Ud. seguro de eliminar el registro?");
    if (opcion == true) {
      this.service.delete(this.inspectionAPIUrl + '/Application/'+id)
      .subscribe(
        response => {
          this.getApplications();
        });
    } 
  }

}
