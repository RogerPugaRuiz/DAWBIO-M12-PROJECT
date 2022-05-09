import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ComunityComponent } from './comunity/comunity.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
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
  { path: '**', component: ErrorComponent, data: { status: 404 }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
