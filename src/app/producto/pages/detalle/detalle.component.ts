import { Component, ElementRef } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { TipoProducto } from '../../interfaces/tipoProducto';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {

  tipoProducto:TipoProducto={
    id:0,
    descripcion:""
  }

    producto: Producto={
    id:0,
    name:"",
    tipoProducto:this.tipoProducto,
    indicaciones:"",
    periodo_retiro_descripcion:"",
    administracion:"",
    almacenamiento:"",
    contra_indicaciones:false,
    periodo_retiro:false,
    imagen_url:[]
  }

  //definimos una variable global
  posImg:number=0;
  lengthListImg:number=0;

  constructor(private _route:ActivatedRoute, private productoService:ProductoService,
              private elRef: ElementRef){

  }

  ngOnInit(){
    let id = this._route.snapshot.paramMap.get("id");
    if(id!=null){
      this.buscarPorId(parseInt(id))
    }
  }

  buscarPorId(id:number):void{
    this.productoService.findById(id).subscribe(response => {
      if(response!=null){
        this.producto=response[0];
        this.lengthListImg=this.producto.imagen_url.length;
        console.log(response)
      }
      else{
        console.log("es vacio")
      }
    })

  }

  //cambias las imagenes segun las necesidades del usuario
  anterior(){
    if(this.posImg>0){
      this.posImg--;
    }
    else if(this.posImg<=0){
      this.posImg=this.lengthListImg-1;
    }
    const imgPrincipal:HTMLElement=this.elRef.nativeElement.querySelector('#producto-img-main');
    if(imgPrincipal){
      imgPrincipal.setAttribute("src", this.producto.imagen_url[this.posImg]);
    }

  }
  siguiente(){
    if(this.posImg==this.lengthListImg-1){
      this.posImg=0;
    }
    else{
      this.posImg++;
    }
    const imgPrincipal:HTMLElement=this.elRef.nativeElement.querySelector('#producto-img-main');
    if(imgPrincipal){
      imgPrincipal.setAttribute("src", this.producto.imagen_url[this.posImg]);
    }
  }

}
