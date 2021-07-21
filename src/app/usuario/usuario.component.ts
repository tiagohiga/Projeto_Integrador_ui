import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario ()
  usuario2: Usuario = new Usuario ()

  idUser: number
  confirmaSenha: string

  postagem: Postagem = new Postagem ()
  idPostagem:number

  status: string
  confirmarCrm: boolean = false

  totalGrupos: number
  page: number = 1

  perfil: string = environment.urlImagemUsuario

  capa: string = environment.urlCapa

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private alertas: AlertasService,
    private postagemService: PostagemService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.tokenUsuario == ''){
      this.router.navigate(['/entrar'])
    }
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUser)
    this.verificarCrm()
    console.log(environment.urlCapa)
    console.log(environment.crmUsuario)
  }

  
  verificarCrm(){
    if(environment.crmUsuario != null){
      this.confirmarCrm = true
      this.status = "Dr(a)."
    }else{
     this.confirmarCrm = false
     this.status = ""
    }
  }

  fotoperfil(event: any){
    this.perfil = 'https://i.imgur.com/UsVZrxF.jpg'
  }

  fotocapa(event: any){
    this.capa = 'https://i.imgur.com/C8bVDbf.jpg'
  }

  findByIdUsuario(id: number){
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.totalGrupos = this.usuario.listaGrupoUsuario.length
      console.log(this.totalGrupos)
    })
  }

  confirmarSenha(event: any){
    this.confirmaSenha = event.target.value
  }

  atualizarUsuario(){
    this.usuario2.emailUsuario = this.usuario.emailUsuario
    this.usuario2.nomeUsuario = this.usuario.nomeUsuario
    this.usuario2.senhaUsuario = this.usuario.senhaUsuario
    this.usuario2.urlImagemUsuario = this.usuario.urlImagemUsuario
    this.usuario2.urlCapa = this.usuario.urlCapa

    if(this.usuario.senhaUsuario != this.confirmaSenha){
      this.alertas.showAlertDanger("As senhas não correspondem")
    }else{
      this.usuarioService.putUsuario(this.idUser, this.usuario2).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.alertas.showAlertSuccess('Perfil atualizado com sucesso! Faça login novamente')
        environment.idUsuario = 0
        environment.nomeUsuario = ""
        environment.emailUsuario = ""
        environment.senhaUsuario = ""
        environment.tokenUsuario = ""
        environment.crmUsuario = ""
        environment.urlImagemUsuario = ""
        environment.urlCapa = ""
        this.router.navigate(['/entrar'])
      })
    }
  }

  deletarUsuario(){
    this.usuarioService.deleteUsuario(this.idUser).subscribe(() => {
      this.alertas.showAlertInfo("Usuário deletado com sucesso")
      this.router.navigate(['/entrar'])
    })
  }


  idDaPostagem(id: number){
    this.idPostagem = id
  }

  deletarPostagem(){
    this.postagemService.deletarPostagem(this.idPostagem).subscribe(()=>{
      this.alertas.showAlertInfo("Postagem deletada com sucesso")
      this.router.navigate(["/inicio"])
    })
  }

  atualizar(){
    this.postagem.usuarioPostagem = this.usuario
    this.postagem.idPostagem = this.idPostagem
    this.postagemService.putPostagem(this.idPostagem,this.postagem).subscribe((resp:Postagem)=>{
      this.postagem=resp
      this.alertas.showAlertSuccess("Postagem atualizada com sucesso!")
      this.router.navigate(["/inicio"])
    })
  }

}
