import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  rolList$!: Observable<any[]>;
  constructor(private service: CaymanAPIService) { }

  readonly inspectionAPIUrl = environment.baseUrl;
  
  ngOnInit(): void {
    this.rolList$ = this.service.getAll(this.inspectionAPIUrl + '/Role'); 
  }

}
