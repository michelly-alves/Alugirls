import { NavbarComponent } from './navbar/navbar.component';
import { CadastroMoradiaComponent } from './cadastro-moradia/cadastro-moradia.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthenticatedGuard } from './authenticated.guard';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { IndexComponent } from './index/index.component';

///aqui fica as telas chamando os componentes pra cada uma, tem q proteger dps
const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: CadastroComponent },
  {path: 'home', component: HomeComponent, canActivate: [AuthenticatedGuard]},
  {path: 'moradia', component:CadastroMoradiaComponent, canActivate: [AuthenticatedGuard]},
  {path: '', redirectTo: '/index', pathMatch: 'full' },
  {path: 'profile', component:ProfileComponent, canActivate: [AuthenticatedGuard]},
  {path: 'editar-perfil', component:EditarPerfilComponent, },
  {path: 'index', component:IndexComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }