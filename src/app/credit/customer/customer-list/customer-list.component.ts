import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList$!: Observable<any[]>;
  readonly inspectionAPIUrl = environment.baseUrl;

  displayedColumns = ['id', 'Tipo', 'Numero', 'Nombres', 'Correo', 'telefono','Acciones'];
  dataSource!: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private service: CaymanAPIService) { }

  ngOnInit(): void {
    //this.customerList$ = this.service.getAll(this.inspectionAPIUrl + '/Customer'); 
    this.getCustomers();
  }


  getCustomers():void{
    this.service.getAll(this.inspectionAPIUrl + '/Customer')
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

  delete(id: any) {
    var opcion = confirm("¿Esta Ud. seguro de eliminar el registro?");
    if (opcion == true) {
      this.service.delete(this.inspectionAPIUrl + '/Customer/'+id)
      .subscribe(
        response => {
          this.getCustomers();
        });
    } 
  }

}
