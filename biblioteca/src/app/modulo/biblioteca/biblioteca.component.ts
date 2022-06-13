import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/modelo/Articulo';
import { Libro } from 'src/app/modelo/Libro';
import { ServicioBibliotecaService } from './servicio/servicio-biblioteca.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})
export class BibliotecaComponent implements OnInit {

  listaArticulos: Articulo[] = new Array
  listaLibros: Libro[] = new Array

  constructor(private bibliotecaService: ServicioBibliotecaService) { }

  ngOnInit(): void {
    this.listarPublicaciones()
  }

  listarPublicaciones(){
    this.bibliotecaService.listarArticulos().subscribe(
      response =>{
        this.listaArticulos = response.respuesta
      }
    )

    this.bibliotecaService.listarLibros().subscribe(
      response =>{
        this.listaLibros = response.respuesta
      }
    )
  }

}
