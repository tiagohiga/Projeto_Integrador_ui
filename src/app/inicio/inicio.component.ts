import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { GrupoService } from '../service/grupo.service';
import { PostagemService } from '../service/postagem.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaGrupos: Grupo[]
  totalGrupos: number
  idGrupo: number
  page: number = 1

  usuario: Usuario = new Usuario()
  idUser: number = environment.idUsuario
  eMedico: boolean = false

  postagem: Postagem = new Postagem()

  perfil: string = environment.urlImagemUsuario

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private grupoServices: GrupoService,
    private usuarioServices: UsuarioService,
    private postagemServices: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)
    if(environment.tokenUsuario == ""){
        this.router.navigate(["/entrar"])
    }
    this.pegarTodosGrupos()
    this.encontrarUsuario(this.idUser)
    this.verificarCrm()
  }

  pegarTodosGrupos(){
    this.grupoServices.getAllGrupo().subscribe((resp: Grupo[]) => {
      this.listaGrupos = resp
      this.totalGrupos = this.listaGrupos.length
      this.encontrarUsuario(this.idUser)
      this.verificarCrm()
    })
  }

  fotoperfil(event: any){
    this.perfil = 'https://i.imgur.com/UsVZrxF.jpg'
  }

  encontrarUsuario(id: number){
    this.usuarioServices.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  publicarPostagem(){
    this.postagemServices.postPostagem(this.postagem, this.idGrupo, this.idUser).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso')
      this.postagem = new Postagem()
      this.router.navigate(['/grupos', this.idGrupo])
    })
  }

  sair(){
    environment.tokenUsuario = ''
    this.router.navigate(['/entrar'])
  }

  verificarCrm(){
    if(environment.crmUsuario != null){
      this.eMedico = true
    }
  }

  mudarPagina(event: number){
    this.page = event;
    this.pegarTodosGrupos()
  }

  encontrarIdGrupo(id: number){
    this.idGrupo = id
  }

}
