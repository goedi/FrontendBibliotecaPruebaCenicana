import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BibliotecaComponent } from './modulo/biblioteca/biblioteca.component';
import { NavbarComponent } from './modulo/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { LibroListComponent } from './modulo/libro/libro-list/libro-list.component';
import { LibroCreateComponent } from './modulo/libro/libro-create/libro-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LibroEditComponent } from './modulo/libro/libro-edit/libro-edit.component';
import { ArticuloListComponent } from './modulo/articulo/articulo-list/articulo-list.component';
import { ArticuloCreateComponent } from './modulo/articulo/articulo-create/articulo-create.component';
import { ArticuloUpdateComponent } from './modulo/articulo/articulo-update/articulo-update.component';
import { EscritosListComponent } from './modulo/autor/escritos-list/escritos-list.component';


@NgModule({
  declarations: [
    AppComponent,
    BibliotecaComponent,
    NavbarComponent,
    LibroListComponent,
    LibroCreateComponent,
    LibroEditComponent,
    ArticuloListComponent,
    ArticuloCreateComponent,
    ArticuloUpdateComponent,
    EscritosListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
