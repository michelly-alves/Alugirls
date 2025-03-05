import { Component, OnInit } from '@angular/core';

interface UserDetails {
  username: string;
  photo: string;
}

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.css']
})
export class UserPerfilComponent implements OnInit {
  usuario: UserDetails | null = null;

  ngOnInit(): void {
    const userDetailsString = localStorage.getItem('userDetails');

    if (userDetailsString) {
      this.usuario = JSON.parse(userDetailsString);
    }
  }
}
