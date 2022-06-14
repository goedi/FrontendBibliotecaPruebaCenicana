import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/modelo/Articulo';
import { Autor } from 'src/app/modelo/Autor';
import Swal from 'sweetalert2';
import { ArticuloServicioService } from '../servicio/articulo-servicio.service';

@Component({
  selector: 'app-articulo-create',
  templateUrl: './articulo-create.component.html',
  styleUrls: ['./articulo-create.component.css']
})
export class ArticuloCreateComponent implements OnInit {
  public createArticulos = new FormGroup({
    issn: new FormControl(),
    titulo: new FormControl(),
    fecha_publicacion: new FormControl(),
    publicacion: new FormControl(),
    paginas: new FormControl(),
    resumen: new FormControl(),
    autores: new FormArray([new FormGroup({ autor: new FormControl() })])
  })

  submitted = false
  listaAutores: Autor[] = new Array

  constructor(private router: Router,private articuloService: ArticuloServicioService) { }

  ngOnInit(): void {
    this.listarAutores()
    this.setValidadores()
  }

  listarAutores() {
    this.articuloService.listaAutores().subscribe(
      response => {
        this.listaAutores = response.respuesta
      }
    )
  }

  setValidadores() {
    this.createArticulos.controls['issn'].setValidators([Validators.required])
    this.createArticulos.controls['titulo'].setValidators([Validators.required])
    this.createArticulos.controls['fecha_publicacion'].setValidators([Validators.required])
    this.createArticulos.controls['publicacion'].setValidators([Validators.required])
    this.createArticulos.controls['paginas'].setValidators([Validators.required])
    this.createArticulos.controls['resumen'].setValidators([Validators.required])
  }

  get autorControler() {
    return this.createArticulos.get('autores') as FormArray
  }

  addAutor() {
    const control = <FormArray>this.createArticulos.controls['autores']
    control.push(new FormGroup({ autor: new FormControl() }))
  }

  createArticulo() {
    if (this.createArticulos.value.autores.length >= 1) {
      let articulo = new Articulo
      articulo.estado = true
      articulo.autores = this.selectAutores(this.createArticulos.value.autores)
      articulo.fecha_publicacion = this.createArticulos.value.fecha_publicacion
      articulo.issn = this.createArticulos.value.issn
      articulo.paginas = this.createArticulos.value.paginas
      articulo.publicacion = this.createArticulos.value.publicacion
      articulo.resumen = this.createArticulos.value.resumen
      articulo.titulo = this.createArticulos.value.titulo
      
      this.articuloService.crearArticulo(articulo).subscribe(
        response=>{
          this.alertas('Se guardo correctamente el articulo: ' + articulo.titulo, 'success')
          this.router.navigate([`biblioteca/articulo`])
        }
      )
    } else {
      this.alertas('Debe ingresar al menos un autor', 'error')
    }
  }

  selectAutores(array: Array<any>) {
    let autor: Autor[] = new Array
    console.log(array);
    
    array.forEach(element => {
      let temp = element.autor
      temp = temp.split(' - ')
      temp = temp[1]
      this.listaAutores.forEach(element => {
        if (temp === element.identificacion) {
          autor.push(element)
        }
      });
    });

    return autor
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createArticulos.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.createArticulos.invalid) {
      return;
    }
    this.createArticulo()
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
