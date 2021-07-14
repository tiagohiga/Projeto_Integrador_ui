import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/app/model/Grupo';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
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
    private route: ActivatedRoute,
    private alertas: AlertasService
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
        this.alertas.showAlertSuccess('Grupo atualizado com sucesso')
        this.router.navigate(['/grupo'])
    }))
  }
}
