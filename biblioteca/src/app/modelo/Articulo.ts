import { Autor } from "./Autor"

export class Articulo {
    issn: number = -1
    paginas: number = -1
    titulo: string = ''
    resumen: string = ''
    fecha_publicacion = new Date
    autores: Autor[] = new Array
    estado: boolean = true
    publicacion: string = ''
    
}