import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MapsComponent } from './maps/maps.component';
import { ComunityComponent } from './comunity/comunity.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { JwtInterceptor } from './authenticate/jwt.interceptor';
import { RegisterComponent } from './register/register.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './services/settings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmContactComponent } from './confirm-contact/confirm-contact.component';
import { ChatComponent } from './chat/chat.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { AdminCrudComponent } from './admin-crud/admin-crud.component';
import { AdminComponent } from './admin/admin.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
    HomeComponent,
    MapsComponent,
    ComunityComponent,
    AboutComponent,
    ContactComponent,
    MyAccountComponent,
    ErrorComponent,
    RegisterComponent,
    SettingsComponent,
    ConfirmContactComponent,
    ChatComponent,
    ChatMessageComponent,
    AdminCrudComponent,
    AdminComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
