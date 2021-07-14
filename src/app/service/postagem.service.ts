import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) { }
  
  token = {
    headers: new HttpHeaders().set('Authorization', environment.tokenUsuario)
  }

  getAllPostagem(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>("https://rssalutem.herokuapp.com/postagem", this.token)
  }

  postPostagem(postagem: Postagem, idGrupo: number, idUsuario: number): Observable<Postagem>{
    return this.http.post<Postagem>(`https://rssalutem.herokuapp.com/postagem/${idGrupo}/${idUsuario}`, postagem, this.token)
  }

  putPostagem(id:number ,postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>(`https://rssalutem.herokuapp.com/postagem/${id}`, postagem, this.token)
  }

  deletarPostagem(id:number){
    return this.http.delete(`https://rssalutem.herokuapp.com/postagem/apagar/${id}`,this.token)
  }
  
  /*getById(id:number):Observable<Postagem>{
    return this.http.get<Postagem>(`https://rssalutem.herokuapp.com/postagem/${id}`,this.token)
  }*/

}
