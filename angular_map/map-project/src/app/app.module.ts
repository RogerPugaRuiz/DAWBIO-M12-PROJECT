import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapComponentComponent } from './map-component/map-component.component';
import { ConnectBackendApiService } from './services/connect-backend-api.service';


@NgModule({
  declarations: [
    AppComponent,
    MapComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ConnectBackendApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
