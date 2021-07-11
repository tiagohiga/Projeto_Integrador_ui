import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoginUsuario } from '../model/LoginUsuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(loginUsuario: LoginUsuario): Observable<LoginUsuario>{
    return this.http.post<LoginUsuario>('https://rssalutem.herokuapp.com/usuario/logar', loginUsuario)
  }

  cadastrar (usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://rssalutem.herokuapp.com/usuario/cadastrar',usuario)
  }

  logado(){
    let ok: boolean = false

    if(environment.tokenUsuario != ""){
      ok = true
    }
    return ok 
  }
  
}
