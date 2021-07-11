import { Grupo } from "./Grupo"
import { Postagem } from "./Postagem"

export class Usuario{
    public idUsuario: number
    public nomeUsuario: string
    public emailUsuario: string
    public senhaUsuario: string
    public crmUsuario: string
    public urlImagemUsuario: string
    public listaGrupoUsuario: Grupo[]
    public listaPostagemUsuario: Postagem[]
}