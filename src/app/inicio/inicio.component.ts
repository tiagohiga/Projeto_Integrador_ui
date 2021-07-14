import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { GrupoService } from '../service/grupo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaGrupos: Grupo[]
  totalGrupos: number
  page: number = 1

  constructor(
    private router: Router,
    private grupoServices: GrupoService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)
    if(environment.tokenUsuario == ""){
        this.router.navigate(["/entrar"])
    }

    this.pegarTodosGrupos()
  }

  pegarTodosGrupos(){
    this.grupoServices.getAllGrupo().subscribe((resp: Grupo[]) => {
      this.listaGrupos = resp
      this.totalGrupos = this.listaGrupos.length
      console.log(this.totalGrupos)
    })
  }

  mudarPagina(event: number){
    this.page = event;
    this.pegarTodosGrupos()
  }

}
