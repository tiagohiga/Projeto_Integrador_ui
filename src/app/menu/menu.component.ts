import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Usuario } from '../model/Usuario';
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

  nomeContainer: string
  larguraTela: number

  pesquisaTema: string

  constructor(
    private router: Router,
    private grupoService: GrupoService,
  ) {this.router.routeReuseStrategy.shouldReuseRoute = () => false;}

  ngOnInit() {
    this.larguraTela = window.innerWidth
    this.atribuirContainer()
    console.log(this.idUser)
  }

  cadastrar() {
    this.grupoService.postGrupo(this.grupo).subscribe((resp: Grupo) => {
      this.grupo = resp
      alert("Grupo criadoo uhuuul!")
      this.grupo = new Grupo()
    })
  }

  criarNovoGrupo(){
    this.grupoService.postNovoGrupo(this.idUser, this.grupo).subscribe((resp: Grupo) => {
      this.grupo = resp
      alert("Será que vai mesmo")
      this.grupo = new Grupo()
    })
  }

  mostrarBusca() {
    this.divVisivel = false
    this.buscaVisivel = true
  }

  esconderPesquisa() {
    this.divVisivel = true
    this.buscaVisivel = false
  }

  sair(){
    environment.tokenUsuario = ''
    this.router.navigate(['/entrar'])
  }

  atribuirContainer(){
    if(this.larguraTela > 767){
      this.nomeContainer = "container"
    }else{
      this.nomeContainer = "container-fluid"
    }
  }

  pesquisarTema(){
    this.router.navigate(['/grupo', this.pesquisaTema])
  }

}
