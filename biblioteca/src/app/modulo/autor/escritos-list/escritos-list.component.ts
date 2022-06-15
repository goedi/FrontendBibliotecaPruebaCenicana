import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Autor } from 'src/app/modelo/Autor';
import { InformeServicioService } from '../servicio/informe-servicio.service';

@Component({
  selector: 'app-escritos-list',
  templateUrl: './escritos-list.component.html',
  styleUrls: ['./escritos-list.component.css']
})
export class EscritosListComponent implements OnInit {

  autores = new FormGroup({
    autor: new FormControl(),
    buscar: new FormControl()
  })
  listaAutores: Autor[] = new Array
  publicacion = new Array
  save = new Array

  constructor(private infomeService: InformeServicioService) { }

  ngOnInit(): void {
    this.autores.controls['buscar'].disable()
    this.infomeService.listaAutores().subscribe(
      response => {
        this.listaAutores = response.respuesta

      }
    )
  }

  selectAutores() {
    let temp = this.autores.value.autor
    let autor: Autor = new Autor
    temp = temp.split(' - ')
    temp = temp[1]

    this.listaAutores.forEach(element => {

      this.listaAutores.forEach(element => {
        if (temp === element.identificacion) {
          autor = element
        }
      });
    });

    this.infomeService.publicaciones(autor.identificacion).subscribe(
      response => {
        this.publicacion = response.respuesta
        this.save = response.respuesta
        this.autores.controls['buscar'].enable()
      }
    )

  }

  applyFilter(event: Event) {
    this.publicacion = this.save
    const filterValue = this.autores.value.buscar
    this.publicacion = filtrarNombre(filterValue, 0, this.publicacion)
  }
}

function filtrarNombre(nombre: string, index: number, array: Array<any>) {
  var temp: any[] = []
  array.forEach(element => {
    let  fecha = new Date(element.fecha).toJSON()
    fecha =fecha.substring(0,10)
    const codigo = String(element.codigo)
    console.log(fecha)
    if (codigo.lastIndexOf(nombre) !=-1) {
      temp.push(element)
    } else if (element.titulo.toLowerCase().lastIndexOf(nombre.toLowerCase()) != -1) {

      temp.push(element)
    } else if (fecha.lastIndexOf(nombre) != -1) {

      temp.push(element)
    }  
  });
  console.log(temp);

  return temp
}