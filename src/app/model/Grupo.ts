import {Usuario} from './Usuario';
import {Postagem} from './Postagem'

export class Grupo{
    public idGrupo: number
    public temaGrupo: string
    public categoriaGrupo: string
    public descricaoGrupo: string
    public urlImagemGrupo: string
    public listaDeUsuarios : Usuario[]
    public listaDePostagens : Postagem[]
}