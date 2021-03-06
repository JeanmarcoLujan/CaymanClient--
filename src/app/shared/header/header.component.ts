import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: any;
  constructor(private router: Router,
    private cookieService: CookieService) { }

  
  ngOnInit(): void {
    this.userName = this.cookieService.get('userName');
  }

  Logout() {
    let logoutConfirm = confirm("¿Esta Ud. seguro de salir de sesión?");
    if (logoutConfirm) {
      this.cookieService.deleteAll();
      this.router.navigate(['/login']);
    }
  }

}
