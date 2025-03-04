import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-minha-moradia',
  templateUrl: './minha-moradia.component.html',
  styleUrls: ['./minha-moradia.component.css']
})
export class MinhaMoradiaComponent {
    moradias: any[] = [];
    usuarioId: number = 11;  
  
    constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.getMoradiasByUsuario(this.usuarioId);
    }
  
    getMoradiasByUsuario(usuarioId: number) {
      this.http.get<any[]>(`http://localhost:8080/api/quarto/${usuarioId}`)
        .subscribe(
          response => {
            this.moradias = response;
          },
          error => {
            console.error('Erro ao carregar moradias do usuário', error);
          }
        );
    }
}
