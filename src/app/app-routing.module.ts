import { LoginComponent } from './components/login/login.component';
import { AdminogrencilerComponent } from './components/adminogrenciler/adminogrenciler.component';
import { OdevlerComponent } from './components/odevler/odevler.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLogin = () =>redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {path:'',component:HomeComponent},

  {path:'kayitlar',component:KayitlarComponent,
  canActivate:[AngularFireAuthGuard],
  data:{
    autGuardPipe:redirectLogin
  }
}
,
  {path:'odevler',component:OdevlerComponent},
  {path:'adminogrenciler',component:AdminogrencilerComponent},
  {path:'login',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
