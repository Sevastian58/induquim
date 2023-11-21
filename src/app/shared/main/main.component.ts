import { Component } from '@angular/core';
import { Producto } from 'src/app/producto/interfaces/producto';
import { TipoProducto } from 'src/app/producto/interfaces/tipoProducto';
import { ProductoService } from 'src/app/producto/services/producto.service';
import { TipoProductoService } from 'src/app/producto/services/tipoProducto.service';
import { map } from 'rxjs/operators';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  backgroundImage:string="url('../../../assets/img/animales/perrito.png')";
  listaProductos:Producto[]=[];
  listaProductosReverso:Producto[]=[]
  listaProductosLimit:Producto[]=[];
  listaTipoProductos:TipoProducto[]=[]
  mouseSobreElemento = false;

  constructor(private productoService:ProductoService, private tipoProductoService:TipoProductoService){

  }

  ngOnInit(){
    this.listarTipoProductos();
    this.listarProductos();
    if(this.listaProductos.length>0){
      this.limitarListaProductos();
    }
   }


   obtenerBackgroudImage(ruta:string):string{
    let url:string  ="url(" +ruta+")";
    return url
   }

  listarProductos(){
    this.productoService.listAll().subscribe(response=>{
      if(response){
        this.listaProductos=response;
        this.limitarListaProductos();
        this.invertirListaProductos(this.listaProductos)
        console.log(response)
      }
    })
  }

  listarTipoProductos(){
    this.tipoProductoService.listAll().subscribe(response=>{
      if(response){
        this.listaTipoProductos=response
      }
    })
  }

  cambiarColorHover(event: MouseEvent) {
    this.mouseSobreElemento = !this.mouseSobreElemento;
    const elemento = event.currentTarget as HTMLElement;
    if(this.mouseSobreElemento==true){
      elemento.style.backgroundColor = 'white';
      if(elemento.querySelector("img")){
        elemento.querySelector("img")!.src=elemento.querySelector("img")!.src.substring(0,47) + ".png";

      }
      if(elemento.querySelector("button")){
        elemento.querySelector("button")?.setAttribute("class", "btn btn-primary m-3")
      }
      if(elemento.querySelector("h4")){
        elemento.querySelector("h4")!.style.color="black"

      }
    }else{
      elemento.style.backgroundColor = 'rgb(97, 97, 200)';
      if(elemento.querySelector("img")){
        elemento.querySelector("img")!.src=elemento.querySelector("img")!.src.substring(0,47) + "-white.png";

      }
      if(elemento.querySelector("button")){
        elemento.querySelector("button")?.setAttribute("class", "btn btn-light m-3")
      }
      if(elemento.querySelector("h4")){
        elemento.querySelector("h4")!.style.color="white"

      }
    }


  }




  limitarListaProductos(){
    for(let i=0; i<this.listaProductos.length && i<4; i++){
      this.listaProductosLimit.push(this.listaProductos[i]);
    }

    console.log("lista productos limit", this.listaProductosLimit)
  }

  invertirListaProductos(productos:Producto[]){
    for(let i=productos.length-1; i>=0; i--){
      this.listaProductosReverso.push(productos[i])
    }
  }


}
