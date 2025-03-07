import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-moradia',
  templateUrl: './cadastro-moradia.component.html',
  styleUrls: ['./cadastro-moradia.component.css']
})
export class CadastroMoradiaComponent {
  titulo: string = '';
  preco: string = '';
  contato: string = '';
  endereco = { rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '' };
  usuario = { id: 2 };  

  constructor(private router: Router, private http: HttpClient) {}
 
  cadastrarmoradia() {
    if (!this.titulo || !this.preco || !this.endereco.rua || !this.endereco.numero || !this.endereco.cep) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const requestBody = {
      titulo: this.titulo,
      preco: this.preco,
      endereco: this.endereco,
      usuario: this.usuario,
      contato: this.contato
  
    };

    this.http.post('http://localhost:8080/api/quarto', requestBody)
      .subscribe(
        (response: any) => {
          console.log('Moradia cadastrada com sucesso', response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Erro ao cadastrar moradia', error);
        }
      );
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}
