import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario

  idUser: number
  confirmaSenha: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.tokenUsuario == ''){
      this.router.navigate(['/entrar'])
    }
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUser)
  }

  verificarCrm(){
    if(this.usuario.crmUsuario != ''){
      return false
    }else{
      return true
    }
  }

  findByIdUsuario(id: number){
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  confirmarSenha(event: any){
    this.confirmaSenha = event.target.value
  }

  atualizarUsuario(){
    if(this.usuario.senhaUsuario != this.confirmaSenha){
      alert("As senhas não correspondem")
    }else{
      this.usuarioService.putUsuario(this.idUser, this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        alert('Perfil atualizado com sucesso! Faça login novamente')
        environment.idUsuario = 0
        environment.nomeUsuario = ""
        environment.emailUsuario = ""
        environment.senhaUsuario = ""
        environment.tokenUsuario = ""
        environment.crmUsuario = ""
        environment.urlImagemUsuario = ""
        this.router.navigate(['/entrar'])
      })
    }
  }

  deletarUsuario(){
    this.usuarioService.deleteUsuario(this.idUser).subscribe(() => {
      alert("Usuário deletado com sucesso")
      this.router.navigate(['/entrar'])
    })
  }

}
