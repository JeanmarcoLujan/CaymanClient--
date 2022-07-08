import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CreditModule } from './credit/credit.module';
import { GeneralModule } from './general/general.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { CaymanAPIService } from './services/cayman-api.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    GeneralModule,
    AuthModule,
    SharedModule,
    CreditModule
  ],
  providers: [
    CookieService,
    CaymanAPIService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
