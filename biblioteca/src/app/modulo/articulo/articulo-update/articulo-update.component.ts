import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Articulo } from 'src/app/modelo/Articulo';
import { Autor } from 'src/app/modelo/Autor';
import Swal from 'sweetalert2';
import { ArticuloServicioService } from '../servicio/articulo-servicio.service';

@Component({
  selector: 'app-articulo-update',
  templateUrl: './articulo-update.component.html',
  styleUrls: ['./articulo-update.component.css']
})
export class ArticuloUpdateComponent implements OnInit {
  public updateArticulos = new FormGroup({
    issn: new FormControl(),
    titulo: new FormControl(),
    fecha_publicacion: new FormControl(),
    publicacion: new FormControl(),
    paginas: new FormControl(),
    resumen: new FormControl(),
    autores: new FormArray([])
  })

  submitted = false
  listaAutores: Autor[] = new Array
  articulo = new Articulo

  constructor(private router: Router, 
    private _route: ActivatedRoute, 
    private articuloService: ArticuloServicioService) { }

  ngOnInit(): void {
    this.listarAutores()
    this.cargarArticulo()
    this.setValidadores()
  }

  listarAutores() {
    this.articuloService.listaAutores().subscribe(
      response => {
        this.listaAutores = response.respuesta
      }
    )
  }

  cargarArticulo() {
    const issn = String(this._route.snapshot.paramMap.get('issn'))
    this.articuloService.buscarUnArticulo(issn).subscribe(
      response => {
        this.articulo = response.respuesta[0]
        this.verArticulo()
      }
    )
  }

  verArticulo() {
    
    const fecha = moment(this.articulo.fecha_publicacion).format('yyyy-MM-DD')
    console.log(this.articulo);

    this.updateArticulos.controls['fecha_publicacion'].setValue(fecha)
    this.updateArticulos.controls['issn'].setValue(Number(this.articulo.issn))
    this.updateArticulos.controls['issn'].disable()
    this.updateArticulos.controls['paginas'].setValue(this.articulo.paginas)
    this.updateArticulos.controls['publicacion'].setValue(this.articulo.publicacion)
    this.updateArticulos.controls['resumen'].setValue(this.articulo.resumen)
    this.updateArticulos.controls['titulo'].setValue(this.articulo.titulo)
    this.verAutores(this.articulo.autores)

  }

  verAutores(autores: Array<Autor>) {
    let nombre: string[] = []
    for (let i = 0; i < autores.length; i++) {
      let name: string = autores[i].nombres + ' ' + autores[i].apellidos + ' - ' + autores[i].identificacion
      let control = <FormArray>this.updateArticulos.controls['autores'] 
      control.push(new FormGroup({ autor: new FormControl(name) }))
    }
  }

  setValidadores() {
    this.updateArticulos.controls['issn'].setValidators([Validators.required])
    this.updateArticulos.controls['titulo'].setValidators([Validators.required])
    this.updateArticulos.controls['fecha_publicacion'].setValidators([Validators.required])
    this.updateArticulos.controls['publicacion'].setValidators([Validators.required])
    this.updateArticulos.controls['paginas'].setValidators([Validators.required])
    this.updateArticulos.controls['resumen'].setValidators([Validators.required])
  }

  articuloActualizado(){
    let articulo = new Articulo
    articulo.estado = true
    articulo.autores = this.selectAutores(this.updateArticulos.value.autores)
    articulo.fecha_publicacion = this.updateArticulos.value.fecha_publicacion
    this.updateArticulos.controls['issn'].enable()
    articulo.issn = this.updateArticulos.value.issn
    this.updateArticulos.controls['issn'].disable()
    articulo.paginas = this.updateArticulos.value.paginas
    articulo.publicacion = this.updateArticulos.value.publicacion
    articulo.resumen = this.updateArticulos.value.resumen
    articulo.titulo = this.updateArticulos.value.titulo
    
    this.articuloService.updateArticulo(articulo).subscribe(
      response=>{
        this.alertas('Se actualizo correctamente el articulo: ' + articulo.titulo, 'success')
        this.router.navigate([`biblioteca/articulo`])
      }
    )
  }

  selectAutores(array: Array<any>) {
    let autor: Autor[] = new Array
    
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


  get autorControler() {
    return this.updateArticulos.get('autores') as FormArray
  }

  addAutor() {
    const control = <FormArray>this.updateArticulos.controls['autores']
    control.push(new FormGroup({ autor: new FormControl() }))
  }

  get f(): { [key: string]: AbstractControl } {
    return this.updateArticulos.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.updateArticulos.invalid) {
      return;
    }
    this.articuloActualizado()
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
