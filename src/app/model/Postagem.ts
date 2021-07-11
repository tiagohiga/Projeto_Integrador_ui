import { Grupo } from "./Grupo"
import { Usuario } from "./Usuario"

export class Postagem{
    public idPostagem: number
    public tituloPostagem: string
    public descricaoPostagem: string
    public urlImagemPostagem: string
    public especialidadePostagem: string
    public data: Date
    public grupoPostagem: Grupo
    public usuarioPostagem: Usuario
}