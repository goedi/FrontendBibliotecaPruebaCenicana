import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Libro } from 'src/app/modelo/Libro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroServiceService {
  protected URL: string
  private _refresh$ = new Subject<void>();

  constructor(private httpClient: HttpClient) {
    this.URL = this.construirURL();
  }

  private construirURL(): string {
    const configuracion = environment.LOCAL_API['LOCAL'];
    return `${configuracion.protocol}://${configuracion.host}:${configuracion.port}/${configuracion.pathName}`
  }

  get refresh$() {
    return this._refresh$
  }

  listarLibros(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/libro/list`)
  }

  listaAutores(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/autor/list`)
  }

  crearLibro(libro: Libro): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}/libro/create`, libro)
  }

  buscarLibro(isbn: any): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/libro/buscar/${isbn}`)
  }

  actualizarLibro(libro: Libro): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}/libro/update`, libro).pipe(
      tap(
        () => {
          this._refresh$.next()
        }
      )
    )
  }

  EliminarLibro(libro: Libro): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}/libro/delete`, libro).pipe(
      tap(
        () => {
          this._refresh$.next()
        }
      )
    )
  }
}
