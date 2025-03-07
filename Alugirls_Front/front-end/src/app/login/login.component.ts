import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  loginFailMessage: string = '';
  showModal: boolean = false;

  constructor(private loginService: LoginService,
    private router: Router,
    private localStorage: StorageService) { }

  ngOnInit(): void {
  }

 /* login(){
    console.log('login - ' + this.email + ':' + this.password);
    this.loginService.login(this.email, this.password).subscribe((user) => {
      const userDetails = {
        email: this.email,
      };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      console.log(user);
      this.loginFailMessage = ''; 
      this.showModal = false; 
      this.router.navigate(['/home']);
      this.localStorage.set('authorization', btoa(this.email + ':' + this.password));
    }, (error) => {
      this.loginFailMessage = 'Usuário ou senha inválidos. Tente novamente';
      this.showModal = true; 
    }) 

   
  }*/

    login() {
      localStorage.clear();
      console.log('login - ' + this.email + ':' + this.password);

      this.loginService.login(this.email, this.password).subscribe(
        (response: any) => {
          console.log("Resposta da API:", response);
          if (response && response.token) {
            console.log("Token recebido:", response.token);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userDetails', JSON.stringify({
              id: response.id,
              nome: response.nome,
              email: response.email
            }));
            this.router.navigate(['/home']);
          } else {
            console.error("Token não encontrado na resposta da API");
            this.loginFailMessage = 'Erro ao fazer login. Tente novamente';
            this.showModal = true;
          }
        },
        (error) => {
          console.error('Login failed', error);
          this.loginFailMessage = 'Usuário ou senha inválidos. Tente novamente';
          this.showModal = true;
        }
      );
    }
        
    

  Cadastro(){
    this.router.navigate(['/register']);
  };
 closeModal() {
      this.showModal = false;
    }
}

  