import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpBasicAuthInterceptor } from './http-basic-auth.interceptor';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { UserPerfilComponent } from './user-perfil/user-perfil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CadastroMoradiaComponent } from './cadastro-moradia/cadastro-moradia.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { ExcluirContaComponent } from './excluir-conta/excluir-conta.component';
import { ProfileComponent } from './profile/profile.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  declarations: [
    
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    SearchComponent,
    UserPerfilComponent,
    NavbarComponent,
    CadastroMoradiaComponent,
    SobreNosComponent,
    EditarPerfilComponent,
    ExcluirContaComponent,
    ProfileComponent,
    IndexComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpBasicAuthInterceptor, multi: true}],
  bootstrap: [ AppComponent ]
})
export class AppModule { }