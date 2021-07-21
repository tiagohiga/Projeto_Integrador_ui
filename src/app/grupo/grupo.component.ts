import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { AlertasService } from '../service/alertas.service';
import { GrupoService } from '../service/grupo.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  idUser = environment.idUsuario

  listaGrupos: Grupo[]
  grupo: Grupo = new Grupo()

key = 'data'
reverse = true

  temaGrupo: string
  
  constructor(
    private grupoService: GrupoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.tokenUsuario ==''){
      this.router.navigate(['/entrar'])
    }

    this.temaGrupo = this.route.snapshot.params['tema']
    this.pegarTodosTema(this.temaGrupo)
    console.log(this.temaGrupo)
  }

  pegarTodos(){
    this.grupoService.getAllGrupo().subscribe((resp:Grupo[])=>{
      this.listaGrupos = resp
    })
  }

  entrar(idGrupo: number) {
    this.grupoService.entrarGrupo(idGrupo, this.idUser).subscribe((resp: Grupo) => {
      this.grupo = resp
      this.alertas.showAlertSuccess("Grupo criado com sucesso")
      this.grupo = new Grupo()
      this.router.navigate(['/grupo'])
    })
  }

  pegarTodosTema(tema: string){
    this.grupoService.getByTemaGrupo(tema).subscribe((resp: Grupo[]) => {
      this.listaGrupos = resp
    })
  }

  pegarPorIdGrupo(id: number){
    this.grupoService.getByIdGrupo(id).subscribe((resp: Grupo) =>{
      this.grupo = resp
    })
    
  }

  deletarGrupo(id: number){
    this.grupoService.deleteGrupo(id).subscribe(() =>{
      this.alertas.showAlertInfo('Grupo removido com sucesso')
      this.router.navigate(['/inicio'])

    })
  }

}
