import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Autor } from 'src/app/modelo/Autor';
import { Libro } from 'src/app/modelo/Libro';
import Swal from 'sweetalert2';
import { LibroServiceService } from '../servicio/libro-service.service';

@Component({
  selector: 'app-libro-create',
  templateUrl: './libro-create.component.html',
  styleUrls: ['./libro-create.component.css']
})
export class LibroCreateComponent implements OnInit {

  public createLibro = new FormGroup({
    isbn: new FormControl(),
    titulo: new FormControl(),
    fecha_publicacion: new FormControl(),
    idioma_original: new FormControl(),
    resumen: new FormControl(),
    id_autor: new FormControl()
  })
 
  submitted = false
  listaAutores: Autor[] = new Array

  constructor(private libroService: LibroServiceService) { }

  ngOnInit(): void {
    this.setValidadores()
    this.listarAutores()
  }


  listarAutores() {
    this.libroService.listaAutores().subscribe(
      response => {
        this.listaAutores = response.respuesta
      }
    )
  }

  crearLibroNuevo() {
    let libro = new Libro

    libro.ISBN = this.createLibro.value.isbn
    libro.id_autor = this.selectAutor()
    libro.fecha_publicacion = this.createLibro.value.fecha_publicacion
    libro.idioma_original = this.createLibro.value.idioma_original
    libro.resumen = this.createLibro.value.resumen
    libro.estado = true
    libro.titulo = this.createLibro.value.titulo

    this.libroService.crearLibro(libro).subscribe(
      response => {
        this.alertas('Se ha creado el libro '+ libro.titulo, 'success')
      }
    )
  }

  selectAutor() {
    let autor = new Autor
    let temp = this.createLibro.value.id_autor
    temp = temp.split(' - ')
    temp = temp[1]
    this.listaAutores.forEach(element => {
      if (temp === element.identificacion) {
        autor = element
      }
    });
    return autor
  }

  setValidadores(){
    this.createLibro.controls['isbn'].setValidators([Validators.required])
    this.createLibro.controls['id_autor'].setValidators([Validators.required])
    this.createLibro.controls['fecha_publicacion'].setValidators([Validators.required])
    this.createLibro.controls['idioma_original'].setValidators([Validators.required])
    this.createLibro.controls['resumen'].setValidators([Validators.required])
    this.createLibro.controls['titulo'].setValidators([Validators.required])
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createLibro.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.createLibro.invalid) {
      return;
    }
    this.crearLibroNuevo()
  }

  alertas(mensaje:string, tipo:string){
    if (tipo === 'error') {
      Swal.fire({
        icon: 'error',
        title: mensaje,
      })
    } else if (tipo === 'success') {
      Swal.fire({
        icon: 'success',
        title: mensaje,
      })
    }
  }
}
