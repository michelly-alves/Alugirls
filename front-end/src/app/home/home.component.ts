import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  moradias: any[] = [];
  moradiasFiltrados: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMoradias();
  }
  
  getMoradias() {
    this.http.get<any>('http://localhost:8080/api/quarto')
      .subscribe(
        response => {
          this.moradias = response;
          this.moradiasFiltrados = this.moradias; 
        },
        error => {
          console.error('Erro ao buscar moradias', error);
        }
      );
  }

  performSearch(searchTerm: string) {
    if (searchTerm) {
      this.moradiasFiltrados = this.moradias.filter(moradia =>
        (moradia.titulo && moradia.titulo.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (moradia.rua && moradia.rua.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      this.moradiasFiltrados = [];
    }
  }
}