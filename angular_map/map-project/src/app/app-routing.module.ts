import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponentComponent } from './map-component/map-component.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', redirectTo: "/home", pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'map', component: MapComponentComponent},
  {path:'login', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
