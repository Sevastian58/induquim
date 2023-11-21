import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TipoProducto } from '../../interfaces/tipoProducto';
import { TipoProductoService } from '../../services/tipoProducto.service';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  //pagincion
  pages:number=1;
  nombre: string = '';
  selectedTipoProducto: number=0;
  listTipoProducto:TipoProducto[]=[];
  listProductos:Producto[]=[];
  listProductosClean:Producto[]=[];

  constructor(private tipoProductoService:TipoProductoService,
              private productoService:ProductoService, private _route:ActivatedRoute){

  }


  ngOnInit(){
   this.listarTipoProducto();
   this.listarProductos();

    //recibimos el parametro
    let id = this._route.snapshot.paramMap.get("tipoId");
    if(id!=null){
      this.selectedTipoProducto= parseInt(id);
      this.filtrar();
    }

  }

  limpiarFiltro(){
    this.listProductos=this.listProductosClean
  }

  filtrar(){
    if(this.nombre!=="" && this.selectedTipoProducto==0){
      this.productoService.filterByName(this.nombre).subscribe(response=>{
        if(response){
          this.listProductos=response;
        }
      })
    }
    else if(this.nombre=="" && this.selectedTipoProducto!=0){
      this.productoService.filterByTypeProduct(this.selectedTipoProducto).subscribe(response=>{
        if(response){
          this.listProductos=response;
        }
      })
    }
    else if(this.nombre!=="" && this.selectedTipoProducto!==0){
      this.productoService.filterByTypeProductAndName(this.selectedTipoProducto, this.nombre).subscribe(response=>{
        if(response){
          this.listProductos=response;
        }
      })
    }
  }



  listarTipoProducto(){
    this.tipoProductoService.listAll().subscribe(response=>{
      if(response){
        this.listTipoProducto=response;
      }
    })
  }
  listarProductos(){
    this.productoService.listAll().subscribe(response=>{
      if(response){
        this.listProductos=response;
        this.listProductosClean=this.listProductos
        console.log(response)
      }
    })
  }


}
