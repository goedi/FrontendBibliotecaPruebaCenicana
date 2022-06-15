import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Articulo } from 'src/app/modelo/Articulo';
import Swal from 'sweetalert2';
import { ArticuloServicioService } from '../servicio/articulo-servicio.service';

@Component({
  selector: 'app-articulo-list',
  templateUrl: './articulo-list.component.html',
  styleUrls: ['./articulo-list.component.css']
})
export class ArticuloListComponent implements OnInit, OnDestroy {

  articulos: Articulo[] = new Array
  private suscription: Subscription = new Subscription

  constructor(private articuloService: ArticuloServicioService) { }

  ngOnInit(): void {
    this.listarArticulos()
    this.suscription = this.articuloService.refresh$.subscribe(() => {
      this.listarArticulos()
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }

  listarArticulos() {
    this.articuloService.listarArticulos().subscribe(
      response => {
        this.articulos = response.respuesta
        console.log(response);
        
      }
    )
  }

  eliminarLibro(articulo: Articulo) {
    Swal.fire({
      title: 'Quieres elimar el articulo: ' + articulo.titulo,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.articuloService.deleteArticulo(articulo).subscribe(
          response => {
          }
        )
        Swal.fire('Se elimino exitosamente el libro', '', 'success')
      } 
    })
  }
}
