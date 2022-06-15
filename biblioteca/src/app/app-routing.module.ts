import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloCreateComponent } from './modulo/articulo/articulo-create/articulo-create.component';
import { ArticuloListComponent } from './modulo/articulo/articulo-list/articulo-list.component';
import { ArticuloUpdateComponent } from './modulo/articulo/articulo-update/articulo-update.component';
import { EscritosListComponent } from './modulo/autor/escritos-list/escritos-list.component';
import { BibliotecaComponent } from './modulo/biblioteca/biblioteca.component';
import { LibroCreateComponent } from './modulo/libro/libro-create/libro-create.component';
import { LibroEditComponent } from './modulo/libro/libro-edit/libro-edit.component';
import { LibroListComponent } from './modulo/libro/libro-list/libro-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'biblioteca', component: BibliotecaComponent },
  { path: 'biblioteca/libros', component: LibroListComponent },
  { path: 'biblioteca/libros/crear', component: LibroCreateComponent },
  { path: 'biblioteca/libros/editar/:isbn', component: LibroEditComponent },
  { path: 'biblioteca/articulo', component: ArticuloListComponent },
  { path: 'biblioteca/articulo/crear', component: ArticuloCreateComponent },
  { path: 'biblioteca/articulo/editar/:issn', component: ArticuloUpdateComponent },
  { path: 'biblioteca/autor', component: EscritosListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
