//Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components Imports
import { MapComponentComponent } from './map-component/map-component.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ExecuteScriptComponent } from './execute-script/execute-script.component';

//Routing options
const routes: Routes = [
  {path:'', redirectTo: "/home", pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'map', component: MapComponentComponent},
  {path:'login', component: LoginComponent},
  {path:'executeScript', component: ExecuteScriptComponent},
  { path: '**', redirectTo: '/home'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
