import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-module/login/login.component';
import { MapComponent } from './map-module/map/map.component';
import { NewsComponent } from './news-module/news/news.component';

const routes: Routes = [
  {path: 'home', component: MapComponent},
  {path: 'news', component: NewsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
