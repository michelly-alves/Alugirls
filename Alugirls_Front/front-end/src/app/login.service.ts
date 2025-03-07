import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_BASE_URL = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<LoginResponse> {
    const params = new URLSearchParams();
    params.set('email', email);
    params.set('senha', senha);

    return this.http.post<LoginResponse>(
      `${this.API_BASE_URL}/login?${params.toString()}`, 
      {}
    );
  }

  getUserByEmail(email: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.API_BASE_URL}/email/${encodeURIComponent(email)}`);
  }
}

interface LoginResponse {
  message: string;
  token: string;
  id: number;
  nome: string;
  email: string;
}

interface UserDetails {
  id: number;
  email: string;
  nome: string;
  matricula: string;
  senha?: string;
}
