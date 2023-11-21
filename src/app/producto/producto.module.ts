import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './pages/producto/producto.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ProductoComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    NgxPaginationModule 
  ]
})
export class ProductoModule { }
