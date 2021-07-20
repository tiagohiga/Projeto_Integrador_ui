import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(
    private http: HttpClient) { }

    token = {
      headers: new HttpHeaders().set('Authorization', environment.tokenUsuario)
    }

    getAllGrupo(): Observable<Grupo[]>{
      return this.http.get<Grupo[]>('https://rssalutem.herokuapp.com/grupo/todos', this.token)
    }

    getByTemaGrupo(tema: string): Observable<Grupo[]>{
      return this.http.get<Grupo[]>(`https://rssalutem.herokuapp.com/grupo/pesquisar/${tema}`, this.token)
    }

    getByIdGrupo(id: number): Observable<Grupo>{
      return this.http.get<Grupo>(`https://rssalutem.herokuapp.com/grupo/id/${id}`, this.token)
    }

    postGrupo(grupo: Grupo, id: number): Observable<Grupo>{
      return this.http.post<Grupo>(`https://rssalutem.herokuapp.com/grupo/cadastrar/${id}`, grupo, this.token)
    }
    
    entrarGrupo(idGrupo: number, idUsuario: number): Observable<Grupo>{
      this.token = {
        headers: new HttpHeaders().set('Authorization', environment.tokenUsuario)
      }
      return this.http.put<Grupo>(`https://rssalutem.herokuapp.com/grupo/entrar/${idGrupo}/${idUsuario}`, this.token)
    }

    sairGrupo(idGrupo: number, idUsuario: number): Observable<Grupo>{
      return this.http.put<Grupo>(`https://rssalutem.herokuapp.com/grupo/sair/${idGrupo}/${idUsuario}`, this.token)
    }

    putGrupo(grupo: Grupo,id: number): Observable<Grupo>{

      return this.http.put<Grupo>(`https://rssalutem.herokuapp.com/grupo/alterar/${id}`,grupo, this.token)
    }

    deleteGrupo(id: number){

      return this.http.delete(`https://rssalutem.herokuapp.com/grupo/deletar/${id}`, this.token)
      
    }

}
