import { Autor } from "./Autor"

export class Libro {
    ISBN: string = ""
    titulo: string = ""
    idioma_original: string = ""
    resumen: string = ""
    fecha_publicacion = new Date
    id_autor = new Autor
    estado: boolean = true
    autores: Autor = new Autor
}