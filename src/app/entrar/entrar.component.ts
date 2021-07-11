import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { LoginUsuario } from '../model/LoginUsuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: LoginUsuario = new LoginUsuario

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  entrar() {
    this.auth.entrar(this.usuarioLogin).subscribe((resp: LoginUsuario) =>{
      this.usuarioLogin = resp

      environment.tokenUsuario = this.usuarioLogin.tokenUsuario
      environment.nomeUsuario = this.usuarioLogin.nomeUsuario
      environment.crmUsuario = this.usuarioLogin.crmUsuario
      environment.emailUsuario = this.usuarioLogin.emailUsuario
      environment.idUsuario = this.usuarioLogin.idUsuario
      environment.urlImagemUsuario = this.usuarioLogin.urlImagemUsuario

      console.log(environment.tokenUsuario)
      console.log(environment.nomeUsuario)
      console.log(environment.crmUsuario)
      console.log(environment.emailUsuario)
      console.log(environment.idUsuario)
      console.log(environment.urlImagemUsuario)
  
     this.router.navigate(['/inicio'])

    })
  }

}
