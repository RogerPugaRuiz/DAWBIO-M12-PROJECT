//Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';

//Date utils imports
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MomentDateModule} from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';

//Requests imports
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Components imports
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MapComponentComponent } from './map-component/map-component.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ExecuteScriptComponent } from './execute-script/execute-script.component';

//Routing import
import { AppRoutingModule } from './app-routing.module';

//Services imports
import { ConnectBackendApiService } from './services/connect-backend-api.service';
import { InterceptorService } from './services/interceptor.service';
import { CookieService } from 'ngx-cookie-service';



//Options DatePipe FORMAT
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@NgModule({
  declarations: [
    AppComponent,
    MapComponentComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    ExecuteScriptComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    ConnectBackendApiService,
    DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true},
    CookieService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }