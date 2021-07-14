import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUsuario: string
  auxiliar: boolean


  constructor(
    public authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
    this.verificaTipo()
  }

  verificaTipo() {
    if (this.tipoUsuario == "medico") {
      this.auxiliar = true
      return true;
    } else {
      this.auxiliar = false
      return false
      
    }
  }
  cadastrar(){
    if(this.auxiliar){
      if(this.usuario.crmUsuario.length == 6){
        this.cadastrar2()
      }else{
        alert("CRM inválido")
      }
    }else{
      this.cadastrar2()
    }
  }

  cadastrar2() {
      if (this.usuario.senhaUsuario != this.confirmarSenha) {
        this.alertas.showAlertDanger("As senhas não correspondem")
      } else {
        this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp
          this.router.navigate(['/entrar'])
          this.alertas.showAlertSuccess("Usuário cadastrado com sucesso!")
        })
      }
  }

}



