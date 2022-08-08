import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';
import { AreaModalComponent } from '../modals/area-modal/area-modal.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  readonly inspectionAPIUrl = environment.baseUrl;

  displayedColumns = ['id', 'Nombre','Acciones'];
  dataSource!: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private service: CaymanAPIService, private dialog: MatDialog) { }

  
  
  ngOnInit(): void {
    this.getAreas();
    this.service.requiredRefresh.subscribe(r => {
      this.getAreas();
    });
  }

  getAreas():void{
    this.service.getAll(this.inspectionAPIUrl + '/Area')
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
    this.dialog.open(AreaModalComponent, {
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
      this.service.delete(this.inspectionAPIUrl + '/Area/'+id)
      .subscribe(
        response => {
          this.getAreas();
        });
    } 
  }

}
