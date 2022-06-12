import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioBibliotecaService {

  protected  URL: string
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

  listarArticulos(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/articulo/list`)
  }
}
