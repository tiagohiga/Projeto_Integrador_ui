import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { GrupoService } from '../service/grupo.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  idUser = environment.idUsuario


  grupo: Grupo = new Grupo()
  nome = environment.nomeUsuario
  foto = environment.urlImagemUsuario
  divVisivel = true
  buscaVisivel = false

  pesquisaTema: string

  larguraTela: number
  width: number

  perfil: string = environment.urlImagemUsuario

  exibe: boolean = true
  exibeBusca: boolean = true
  exibeBarra: boolean = true

  constructor(
    private router: Router,
    private grupoService: GrupoService,
    private alertas: AlertasService
  ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.width = 30
    }

  ngOnInit() {
    this.verificarTela(window.innerWidth)
    this.tamanhoBarra()
    console.log(this.idUser)
  }

  criarNovoGrupo(){
    this.grupoService.postGrupo(this.grupo, this.idUser).subscribe((resp: Grupo) => {
      this.grupo = resp
      this.alertas.showAlertSuccess("Grupo criado com sucesso")
      this.grupo = new Grupo()
      this.router.navigate(['/inicio'])
    })
  }

  fotoperfil(event: any){
    this.perfil = 'https://i.imgur.com/UsVZrxF.jpg'
  }

  sair(){
    environment.tokenUsuario = ''
    this.router.navigate(['/entrar'])
  }

  pesquisarTema(){
    this.router.navigate(['/grupo', this.pesquisaTema])
    !this.exibe
  }

  verificarCrm(){
    if(environment.crmUsuario != null){
      return true
    } else{
      return false
    }
  }

  exibirBuscaCompleta(){
    this.exibe = !this.exibe
    this.tamanhoBarra()
  }

  onResize(event: any){
    this.larguraTela = event.target.innerWidth
    this.verificarTela(this.larguraTela)
    this.tamanhoBarra()
  }

  verificarTela(largura: number){
    if(largura < 490){
      this.exibeBusca = true
      this.exibeBarra = false
    }else{
      this.exibeBusca = false
      this.exibeBarra = true
    }
  }

  tamanhoBarra(){
    if(this.exibeBusca == false){
      if(this.exibe){
        this.width = 30
        this.exibeBarra = true
      }else{
        this.width = 100
        this.exibeBarra = true
      }
    }else{
      if(this.exibe){
        this.exibeBarra = false
        this.width = 0
      }else{
        this.exibeBarra = true
        this.width = 100
      }
    }
  }

}
