import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_USER_ME: string = 'http://localhost:8080/api/usuario';
  private API_USER_BY_EMAIL = 'http://localhost:8080/api/usuario/email';
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders(
      {
        authorization : 'Basic ' + btoa(username + ':' + password)
      }
    );
    return this.http.get<Object>(this.API_USER_ME, {headers: headers});
  }

  getUserByEmail(email: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.API_USER_ME}/email/${encodeURIComponent(email)}`);
}

}
interface UserDetails {
  id: number;  
  email: string;
  nome: string;
  matricula: string;
  senha?: string;
}

