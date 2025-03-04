import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

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
    private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log('login - ' + this.email + ':' + this.password);
    this.loginService.login(this.email, this.password).subscribe((user) => {
      const userDetails = {
        email: this.email,
      };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      console.log('USER/ME: ');
      console.log(user);
      this.loginFailMessage = ''; 
      this.showModal = false; 
      this.router.navigate(['/home']);
    }, (error) => {
      this.loginFailMessage = 'Usuário ou senha inválidos. Tente novamente';
      this.showModal = true; 
    })

   
  }

  Cadastro(){
    this.router.navigate(['/register']);
  };
 closeModal() {
      this.showModal = false;
    }
}

  