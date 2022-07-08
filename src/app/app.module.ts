import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CreditModule } from './credit/credit.module';
import { GeneralModule } from './general/general.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    GeneralModule,
    AuthModule,
    SharedModule,
    CreditModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
