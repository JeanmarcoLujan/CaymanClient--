import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { CaymanAPIService } from 'src/app/services/cayman-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  subRef$!: Subscription;
  errorMessage: boolean = false;

  readonly inspectionAPIUrl = environment.baseUrl;
  url = this.inspectionAPIUrl + '/Authentication/validacion';

  constructor(formBuilder: FormBuilder,
    private router: Router,
    private service: CaymanAPIService,
    private cookieService: CookieService) {

    this.formLogin = formBuilder.group({
      nick: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }


  Login(): void {
    const usuarioLogin: any = {
      nickName: this.formLogin.value.nick,
      password: this.formLogin.value.password,
    };

    
    //console.log(usuarioLogin);


    this.subRef$ = this.service.post<any>(this.url,
      usuarioLogin)
      .subscribe(res => {
        const token = res.body.response;
       // console.log('token', token);
        //console.log(res.body);
        //this.securityService.SetAuthData(token);
        this.cookieService.set('token',res.body.token);
        this.cookieService.set('userName', res.body.admin);
        this.cookieService.set('userId', res.body.id);
        this.router.navigate(['/dashboard']);
        //this.errorMessage = false;
      }, err => {
        alert("ingrese las credenciales correctas");
        //console.log('Error en el login', err);
        this.errorMessage = true;
      });
  }

  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }

}
