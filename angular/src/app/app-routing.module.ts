import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminCrudComponent } from './admin-crud/admin-crud.component';
import { AdminComponent } from './admin/admin.component';
import { ComunityComponent } from './comunity/comunity.component';
import { ContactComponent } from './contact/contact.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ErrorComponent } from './error/error.component';
import { AdminGuard } from './guards/admin.guard';
import { RegisterGuard } from './guards/register.guard';
import { UserGuard } from './guards/user.guard';
import { HomeComponent } from './home/home.component';
import { MapsComponent } from './maps/maps.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'maps', component: MapsComponent},
  { path: 'comunity', component: ComunityComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'myAccount', component: MyAccountComponent, canActivate: [UserGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [RegisterGuard]},
  { path: 'settings', component: SettingsComponent},
  { path: 'error', component: ErrorComponent},
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard]},
  { path: "admin/edit-user/:id", component: EditUserComponent, canActivate: [AdminGuard]},
  { path: '**', component: ErrorComponent, data: { status: 404 }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
