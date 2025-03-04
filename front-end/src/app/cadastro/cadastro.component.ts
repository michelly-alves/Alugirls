import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <--- Adicione esta linha


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  nome: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';


  constructor(private router: Router, private http: HttpClient) {}

  register() {
    
const user = {
  nome: this.nome,
  senha: this.password,
  email: this.email
};

this.http.post('http://localhost:8080/api/usuario', user)
.subscribe(
  response => {
    console.log('Cadastro realizado com sucesso', response);
    this.router.navigate(['/login']);
  },
  error => {
    console.error('Erro ao cadastrar usuário', error);
    alert('Erro ao cadastrar: ' + error.message);
  }
);
}
}