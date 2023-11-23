import { Component, ElementRef, Renderer2 } from '@angular/core';
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
    imagen_url:[],
    color:""
  }

  //definimos una variable global
  posImg:number=0;
  lengthListImg:number=0;

  constructor(private _route:ActivatedRoute, private productoService:ProductoService,
              private elRef: ElementRef, private renderer: Renderer2){

  }

  ngOnInit(){
    let id = this._route.snapshot.paramMap.get("id");
    if(id!=null){
      this.buscarPorId(parseInt(id))
    }

    this.definirColores();
  }

  buscarPorId(id:number):void{
    this.productoService.findById(id).subscribe(response => {
      if(response!=null){
        this.producto=response[0];
        this.lengthListImg=this.producto.imagen_url.length;
        this.definirColores();
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
    const imgPrincipal:HTMLImageElement=this.elRef.nativeElement.querySelector('#producto-img-main');
    if(imgPrincipal){
      imgPrincipal.setAttribute("src", this.producto.imagen_url[this.posImg]);
      this.ajustarTamnioImg(imgPrincipal);
    }

  }
  siguiente(){
    if(this.posImg==this.lengthListImg-1){
      this.posImg=0;
    }
    else{
      this.posImg++;
    }
    const imgPrincipal:HTMLImageElement=this.elRef.nativeElement.querySelector('#producto-img-main');
    if(imgPrincipal){
      imgPrincipal.setAttribute("src", this.producto.imagen_url[this.posImg]);
      this.ajustarTamnioImg(imgPrincipal);
    }
  }

  ajustarTamnioImg(imgElement:HTMLImageElement){

    let anchoImg= imgElement.naturalWidth
    let altoImg= imgElement.naturalHeight

    if(anchoImg>altoImg){
      imgElement.style.width= "400px";
      imgElement.style.height="100px";
    }
    else{
      imgElement.style.width= "14vw";
      imgElement.style.height= "60vh";
    }
  }

  ordenarImg(event:Event, index:number){
    let numElements = this.producto.imagen_url.length;
    let diferencia = 0;
    let maximo=180;
    let minimo=50;

    diferencia=(maximo-minimo)/(numElements-1)

    const elementoHTML: HTMLElement = (event.target as HTMLElement);

    let newHeight=maximo - diferencia*(index)

    elementoHTML.style.height=newHeight+"px";
    elementoHTML.style.width="auto";
  }

  definirColores() {
    // Modificar estilos de h3
    const elementH3List = this.elRef.nativeElement.querySelectorAll("h3");
    console.log(elementH3List)
    elementH3List.forEach((elementH3:HTMLElement)=> {
      console.log("el h3 es ",elementH3)
      this.renderer.setStyle(elementH3, 'backgroundColor', this.producto.color);
    });

    // Modificar estilos de h4
    const elementH4List = this.elRef.nativeElement.querySelectorAll("h4");
    elementH4List.forEach((elementH4: HTMLElement)=> {
      console.log("el h4 es ",elementH4)
      this.renderer.setStyle(elementH4, 'color', this.producto.color);
    });
  }

}
