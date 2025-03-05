import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'; 

interface UserDetails {
  id: number;  
  email: string;
  nome: string;
  matricula: string;
  senha?: string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string = '';
  matricula: string = '';
  usuario: UserDetails | null = null;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      this.email = userDetails.email || '';
    }

    if (this.email) {
      this.loginService.getUserByEmail(this.email).subscribe(
        (response: UserDetails) => {
          this.usuario = response;
          if (this.usuario) {
            this.matricula = this.usuario.matricula; 
          }
        },
        error => {
          console.error('Erro ao buscar os dados do usuário', error);
        }
      );
    } 
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/editar-perfil']);
  }

  deleteAccount(): void {
    this.router.navigate(['/login']);
  }

  limparLocalStorage(): void {
    localStorage.clear();
    console.log('Local Storage foi limpo!');
    this.router.navigate(['/index']);
  }
}
