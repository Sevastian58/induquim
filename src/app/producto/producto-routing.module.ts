import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './pages/producto/producto.component';
import { DetalleComponent } from './pages/detalle/detalle.component';

const routes: Routes = [
  {
    path: 'producto',
    children: [
      { path: 'producto', component: ProductoComponent },
      { path: 'producto/:tipoId', component: ProductoComponent },
      { path: 'detalle', component: DetalleComponent },
      { path: 'detalle/:id', component: DetalleComponent },
      // Otras rutas si es necesario
      { path: '', redirectTo: 'producto', pathMatch: 'full' }, // Ruta por defecto
      { path: '**', redirectTo: 'producto' } // Ruta genérica
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
