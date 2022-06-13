import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Autor } from 'src/app/modelo/Autor';
import { Libro } from 'src/app/modelo/Libro';
import Swal from 'sweetalert2';
import { LibroServiceService } from '../servicio/libro-service.service';

@Component({
  selector: 'app-libro-edit',
  templateUrl: './libro-edit.component.html',
  styleUrls: ['./libro-edit.component.css']
})
export class LibroEditComponent implements OnInit {

  public editarLibro = new FormGroup({
    isbn: new FormControl(),
    titulo: new FormControl(),
    fecha_publicacion: new FormControl(),
    idioma_original: new FormControl(),
    resumen: new FormControl(),
    id_autor: new FormControl()
  })

  submitted = false
  listaAutores: Autor[] = new Array
  libro = new Libro

  constructor(private libroService: LibroServiceService,
    private _route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarLibro()
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

  cargarLibro() {
    const isbn = String(this._route.snapshot.paramMap.get('isbn'))
    this.libroService.buscarLibro(isbn).subscribe(
      response => {
        this.libro = response.respuesta[0]
        this.setLibro()
      }
    )
  }


  setLibro() {
    const autor = this.libro.id_autor.nombres + ' ' + this.libro.id_autor.apellidos + ' - ' + this.libro.id_autor.identificacion
    const fecha = moment(this.libro.fecha_publicacion).format('yyyy-MM-DD')
    this.editarLibro.controls['isbn'].setValue(this.libro.ISBN)
    this.editarLibro.controls['isbn'].disable()
    this.editarLibro.controls['fecha_publicacion'].setValue(fecha)
    this.editarLibro.controls['id_autor'].setValue(autor)
    this.editarLibro.controls['idioma_original'].setValue(this.libro.idioma_original)
    this.editarLibro.controls['resumen'].setValue(this.libro.resumen)
    this.editarLibro.controls['titulo'].setValue(this.libro.titulo)

  }


  editarLibroNuevo() {
    let libro = new Libro
    this.editarLibro.controls['isbn'].enable()
    libro.ISBN = this.editarLibro.value.isbn
    this.editarLibro.controls['isbn'].disable()
    libro.id_autor = this.selectAutor()
    libro.fecha_publicacion = this.editarLibro.value.fecha_publicacion
    libro.idioma_original = this.editarLibro.value.idioma_original
    libro.resumen = this.editarLibro.value.resumen
    libro.estado = true
    libro.titulo = this.editarLibro.value.titulo


    this.libroService.actualizarLibro(libro).subscribe(
      response => {
        this.alertas('Se ha actualizado el libro ' + libro.titulo, 'success')
        this.router.navigate(['biblioteca/libros']);
      }
    )
  }

  selectAutor() {
    let autor = new Autor
    let temp = this.editarLibro.value.id_autor

    temp = temp.split(' - ')
    temp = temp[1]
    this.listaAutores.forEach(element => {
      if (temp === element.identificacion) {
        autor = element
      }
    });
    return autor
  }

  setValidadores() {
    this.editarLibro.controls['isbn'].setValidators([Validators.required])
    this.editarLibro.controls['id_autor'].setValidators([Validators.required])
    this.editarLibro.controls['fecha_publicacion'].setValidators([Validators.required])
    this.editarLibro.controls['idioma_original'].setValidators([Validators.required])
    this.editarLibro.controls['resumen'].setValidators([Validators.required])
    this.editarLibro.controls['titulo'].setValidators([Validators.required])
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editarLibro.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.editarLibro.invalid) {
      return;
    }
    this.editarLibroNuevo()
  }

  alertas(mensaje: string, tipo: string) {
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
