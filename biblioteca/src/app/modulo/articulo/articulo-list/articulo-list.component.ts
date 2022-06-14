import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/modelo/Articulo';
import { ArticuloServicioService } from '../servicio/articulo-servicio.service';

@Component({
  selector: 'app-articulo-list',
  templateUrl: './articulo-list.component.html',
  styleUrls: ['./articulo-list.component.css']
})
export class ArticuloListComponent implements OnInit {

  articulos: Articulo[] = new Array

  constructor(private articuloService: ArticuloServicioService) { }

  ngOnInit(): void {
    this.listarArticulos()
  }

  listarArticulos() {
    this.articuloService.listarArticulos().subscribe(
      response => {
        this.articulos = response.respuesta
        console.log(response);
        
      }
    )
  }
}
