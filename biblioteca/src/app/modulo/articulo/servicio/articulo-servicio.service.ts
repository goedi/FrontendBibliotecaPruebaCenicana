import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Articulo } from 'src/app/modelo/Articulo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticuloServicioService {
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
  
  listaAutores(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/autor/list`)
  }

  listarArticulos(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/articulo/list`)
  }

  crearArticulo(articulo: Articulo): Observable<any>{
    return this.httpClient.post<any>(`${this.URL}/articulo/create`, articulo)
  }
}
