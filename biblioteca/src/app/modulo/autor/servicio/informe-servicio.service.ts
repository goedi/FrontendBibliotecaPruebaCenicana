import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Articulo } from 'src/app/modelo/Articulo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformeServicioService {
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
    return this.httpClient.get<any>(`${this.URL}/autor/con_publicaciones`)
  }

  publicaciones(id_autor:string): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/autor/publicaciones/${id_autor}`)
  }

  totalPublicaciones():Observable<any>{
    return this.httpClient.get<any>(`${this.URL}/autor/total_publicaciones`)
  }
}
