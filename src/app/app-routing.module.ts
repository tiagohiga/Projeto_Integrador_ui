import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { GrupoDeletarComponent } from './deletar/grupo-deletar/grupo-deletar.component';
import { GrupoEditarComponent } from './editar/grupo-editar/grupo-editar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { GrupoComponent } from './grupo/grupo.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [  
  {path:"", redirectTo:"entrar", pathMatch:"full"},
  {path:"entrar", component: EntrarComponent},
  {path:"cadastrar", component: CadastrarComponent},
  {path: "inicio", component: InicioComponent},
  {path: "user/:id", component: UsuarioComponent},

  {path: "grupo-editar/:id", component: GrupoEditarComponent},
  {path: "grupo-deletar/:id", component: GrupoDeletarComponent},

  {path: "grupo", component: GrupoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
