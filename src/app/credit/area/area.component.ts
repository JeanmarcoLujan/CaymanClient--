import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  areaList$!: Observable<any[]>;
  readonly inspectionAPIUrl = environment.baseUrl;
  constructor(private service: CaymanAPIService) { }

  
  
  ngOnInit(): void {
    this.areaList$ = this.service.getAll(this.inspectionAPIUrl + '/Area'); 
  }

}
