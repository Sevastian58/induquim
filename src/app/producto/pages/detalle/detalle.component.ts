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
    rs:"",
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
  windowWidth:number=0

  constructor(private _route:ActivatedRoute, private productoService:ProductoService,
              private elRef: ElementRef, private renderer: Renderer2){

                this.windowWidth = window.innerWidth;
                window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnInit(){
    let id = this._route.snapshot.paramMap.get("id");
    if(id!=null){
      this.buscarPorId(parseInt(id))
    }

    this.definirColores();
    this.posicionarTablas();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.definirColores();
      this.posicionarTablas();
      const imgPrincipal:HTMLImageElement=this.elRef.nativeElement.querySelector('#producto-img-main');
      this.ajustarTamnioImg(imgPrincipal);
    }, 500);
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

    console.log("el ancho real es:", anchoImg);

    console.log("el alto es ", altoImg)
    let newAlto= altoImg*(168.8)/anchoImg

    if(anchoImg>altoImg){
      imgElement.style.width= "400px";
      imgElement.style.height="auto";
    }
    if(anchoImg/altoImg<=0.35 && altoImg>anchoImg){
      imgElement.style.width="140px";
      imgElement.style.height="600px";
    }
    if(altoImg>anchoImg && anchoImg/altoImg>0.35){
      imgElement.style.width= "168px";
      imgElement.style.height= newAlto+"px";
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

      this.renderer.setStyle(elementH3, 'backgroundColor', this.producto.color);
    });

    // Modificar estilos de h4
    const elementH4List = this.elRef.nativeElement.querySelectorAll("h4");
    elementH4List.forEach((elementH4: HTMLElement)=> {

      this.renderer.setStyle(elementH4, 'color', this.producto.color);
    });

    //modificar los estilos h6
    const elementH5List = this.elRef.nativeElement.querySelectorAll("h5");
    elementH5List.forEach((elementH5: HTMLElement)=> {

      this.renderer.setStyle(elementH5, 'backgroundColor', this.producto.color);
      this.renderer.setStyle(elementH5, 'color', "white");
    });
  }

  onResize(){

  }

  posicionarTablas():void{
    this.windowWidth=window.innerWidth

    if((this.producto.composicion && this.producto.composicion.elementos && this.producto.composicion.elementos.length > 0)&&(this.producto.dosificacion && this.producto.dosificacion.length > 0)){
      const detalleProducto:HTMLElement = this.elRef.nativeElement.querySelector("#detalle-producto");
      if(detalleProducto){
        detalleProducto.classList.add("justify-content-around")
        detalleProducto.classList.remove("justify-content-end")
        detalleProducto.classList.add("m-5")
      }
    }
    else{
      if (this.producto.composicion && this.producto.composicion.elementos && this.producto.composicion.elementos.length > 0) {
        const detalleProducto:HTMLElement = this.elRef.nativeElement.querySelector("#detalle-producto");
        if(detalleProducto){
          detalleProducto.classList.remove("justify-content-around")
          detalleProducto.classList.add("justify-content-end")
          detalleProducto.classList.add("m-5")
          detalleProducto.style.paddingRight="26%"
        }
      }

      // Verificar si hay datos en la dosificación
      if (this.producto.dosificacion && this.producto.dosificacion.length > 0) {
        const detalleProducto:HTMLElement = this.elRef.nativeElement.querySelector("#detalle-producto");
        if(detalleProducto){
          detalleProducto.classList.remove("justify-content-around")
          detalleProducto.classList.add("justify-content-end")
          detalleProducto.classList.add("m-5")
          detalleProducto.style.paddingRight="26%"
        }
      }
    }

  }
}
