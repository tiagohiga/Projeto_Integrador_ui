import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/app/model/Grupo';
import { Usuario } from 'src/app/model/Usuario';
import { GrupoService } from 'src/app/service/grupo.service';

@Component({
  selector: 'app-grupo-editar',
  templateUrl: './grupo-editar.component.html',
  styleUrls: ['./grupo-editar.component.css']
})
export class GrupoEditarComponent implements OnInit {

    grupo: Grupo = new Grupo()
     idGrupo : number
  constructor(
    private grupoService: GrupoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.idGrupo= this.route.snapshot.params['id']

  }

  procurarGrupoPorId(){
    this.grupoService.getByIdGrupo(this.idGrupo).subscribe((resp: Grupo) =>{
      this.grupo = resp
    })
  }

  atualizarGrupo(){
    this.grupoService.putGrupo(this.grupo, this.idGrupo).subscribe((resp =>{
        this.grupo = resp
        alert('Grupo Atualizado!!!')
        this.router.navigate(['/grupo'])

    }))
  }
}
