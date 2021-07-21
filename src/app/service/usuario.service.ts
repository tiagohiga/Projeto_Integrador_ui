import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.tokenUsuario)
  }

  getByIdUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://rssalutem.herokuapp.com/usuario/${id}`, this.token)
  }

  putUsuario(id: number, usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`https://rssalutem.herokuapp.com/usuario/atualizar/${id}`, usuario, this.token)
  }

  deleteUsuario(id: number){
    return this.http.delete(`https://rssalutem.herokuapp.com/usuario/${id}`, this.token)
  }

}
