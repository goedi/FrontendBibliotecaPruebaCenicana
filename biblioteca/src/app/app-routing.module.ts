import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
