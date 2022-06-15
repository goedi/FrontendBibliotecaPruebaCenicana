import { Component, OnDestroy, OnInit } from '@angular/core';
import { Libro } from 'src/app/modelo/Libro';
import { LibroServiceService } from '../servicio/libro-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libro-list',
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.css']
})
export class LibroListComponent implements OnInit, OnDestroy {

  libros: Libro[] = new Array
  private suscription: Subscription = new Subscription
  constructor(private router: Router, private libroService: LibroServiceService) { }

  ngOnInit(): void {
    this.listarLibros()
    this.suscription = this.libroService.refresh$.subscribe(() => {
      this.listarLibros()
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }

  listarLibros() {
    this.libroService.listarLibros().subscribe(
      response => {
        this.libros = response.respuesta

      }
    )
  }

  crearLibro(): void {
    this.router.navigate(['biblioteca/libros/crear']);
  }

  editarLibro(libro: Libro): void {
    this.router.navigate([`biblioteca/libros/editar/${libro.ISBN}`])
  }

  eliminarLibro(libro: Libro) {
    Swal.fire({
      title: 'Quieres elimar el libro: ' + libro.titulo,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.libroService.EliminarLibro(libro).subscribe(
          response => {
          }
        )
        Swal.fire('Se elimino exitosamente el libro', '', 'success')
      } 
    })
  }


}
